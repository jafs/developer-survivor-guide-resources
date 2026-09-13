// Desafío 4: La noche del muro norte.
// La noche se ejecuta con: deno run block04/challenge4.ts
// Los tests se ejecutan con: deno test block04/challenge4.ts

import { test } from "node:test";
import assert from "node:assert/strict";

// === PARTE 1: ERRORES ===

class SensorAveriadoError extends Error {
    public readonly torre: string;
    public readonly lectura: number;

    public constructor(torre: string, lectura: number) {
        super(`Sensor averiado en la torre ${torre}: ${lectura} zombis`);
        this.name = "SensorAveriadoError";
        this.torre = torre;
        this.lectura = lectura;
    }
}

class TorreSinRespuestaError extends Error {
    public readonly torre: string;
    public readonly milisegundos: number;

    public constructor(torre: string, milisegundos: number) {
        super(`La torre ${torre} no responde tras ${milisegundos} ms`);
        this.name = "TorreSinRespuestaError";
        this.torre = torre;
        this.milisegundos = milisegundos;
    }
}

// === PARTE 2: TORRES ===

type Informe = {
    torre: string;
    zombis: number;
    municion: number;
};

interface Torre {
    readonly nombre: string;
    informar(): Promise<Informe>;
}

class TorreSimulada implements Torre {
    public readonly nombre: string;
    private milisegundos: number;
    private zombis: number;
    private municion: number;

    public constructor(
        nombre: string,
        milisegundos: number,
        zombis: number,
        municion: number,
    ) {
        this.nombre = nombre;
        this.milisegundos = milisegundos;
        this.zombis = zombis;
        this.municion = municion;
    }

    public informar(): Promise<Informe> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Un contador congelado da lecturas negativas.
                if (this.zombis < 0) {
                    reject(new SensorAveriadoError(this.nombre, this.zombis));
                    return;
                }
                resolve({
                    torre: this.nombre,
                    zombis: this.zombis,
                    municion: this.municion,
                });
            }, this.milisegundos);
        });
    }
}

function conTiempoMaximo(
    torre: Torre,
    milisegundos: number,
): Promise<Informe> {
    const limite = new Promise<Informe>((resolve, reject) => {
        setTimeout(() => {
            reject(new TorreSinRespuestaError(torre.nombre, milisegundos));
        }, milisegundos);
    });
    return Promise.race([torre.informar(), limite]);
}

// === PARTE 3: COORDINACIÓN DE LA LÍNEA ===

type Ronda = {
    torres: number;
    informes: Informe[];
    averiadas: string[];
    sinRespuesta: string[];
};

type EstadoLinea = "resiste" | "pide refuerzos" | "a punto de romper";

async function recogerInformes(
    torres: Torre[],
    milisegundos: number,
): Promise<Ronda> {
    const resultados = await Promise.allSettled(
        torres.map((torre) => conTiempoMaximo(torre, milisegundos)),
    );

    const ronda: Ronda = {
        torres: torres.length,
        informes: [],
        averiadas: [],
        sinRespuesta: [],
    };

    for (const resultado of resultados) {
        if (resultado.status === "fulfilled") {
            ronda.informes.push(resultado.value);
            continue;
        }
        const error: unknown = resultado.reason;
        if (error instanceof SensorAveriadoError) {
            ronda.averiadas.push(error.torre);
        } else if (error instanceof TorreSinRespuestaError) {
            ronda.sinRespuesta.push(error.torre);
        } else {
            // Solo sabemos atender los dos errores de la parte 1.
            throw error;
        }
    }

    return ronda;
}

function evaluarLinea(ronda: Ronda): EstadoLinea {
    let zombis = 0;
    let municion = 0;
    for (const informe of ronda.informes) {
        zombis += informe.zombis;
        municion += informe.municion;
    }

    const informadas = ronda.informes.length;
    if (informadas === 0 || informadas < ronda.torres / 2) {
        return "a punto de romper";
    }
    if (zombis > municion) {
        return "a punto de romper";
    }

    const hayFallos =
        ronda.averiadas.length > 0 || ronda.sinRespuesta.length > 0;
    if (hayFallos || zombis > municion / 2) {
        return "pide refuerzos";
    }
    return "resiste";
}

// === BONUS: OBSERVADORES DE LA LÍNEA ===

interface ObservadorLinea {
    estadoCambiado(hora: string, estado: EstadoLinea): void;
}

class AvisoBarricada implements ObservadorLinea {
    public estadoCambiado(hora: string, estado: EstadoLinea): void {
        console.log(`[${hora}] Aviso a Ana y Marcos: la línea ${estado}`);
    }
}

// Cuanto más alto, peor está la línea.
const GRAVEDAD: Map<EstadoLinea, number> = new Map([
    ["resiste", 0],
    ["pide refuerzos", 1],
    ["a punto de romper", 2],
]);

// === PARTE 4: LA NOCHE ===

const LIMITE_RESPUESTA_MS = 500;

function mostrarRonda(hora: string, ronda: Ronda, estado: EstadoLinea): void {
    console.log(`\n=== RONDA DE LAS ${hora} ===`);
    for (const informe of ronda.informes) {
        console.log(
            `Torre ${informe.torre}: ${informe.zombis} zombis, ` +
            `${informe.municion} de munición`
        );
    }
    if (ronda.averiadas.length > 0) {
        console.log(`Sensores averiados: ${ronda.averiadas.join(", ")}`);
    }
    if (ronda.sinRespuesta.length > 0) {
        console.log(`Sin respuesta: ${ronda.sinRespuesta.join(", ")}`);
    }
    console.log(`Estado de la línea: ${estado}`);
}

async function vigilarNoche(
    rondas: [string, Torre[]][],
    observadores: ObservadorLinea[],
): Promise<void> {
    let gravedadAnterior = 0;

    for (const [hora, torres] of rondas) {
        const ronda = await recogerInformes(torres, LIMITE_RESPUESTA_MS);
        const estado = evaluarLinea(ronda);
        mostrarRonda(hora, ronda, estado);

        const gravedad = GRAVEDAD.get(estado) ?? 0;
        if (gravedad > gravedadAnterior) {
            observadores.forEach((observador) =>
                observador.estadoCambiado(hora, estado),
            );
        }
        gravedadAnterior = gravedad;

        if (estado === "a punto de romper") {
            console.log(
                "\nAquí la cárcel. " +
                "La segunda línea del muro norte está a punto de"
            );
            console.log("(Se corta la transmisión)");
            return;
        }
    }

    console.log("\nLa línea ha aguantado toda la noche");
}

const rondasDeLaNoche: [string, Torre[]][] = [
    ["22:00", [
        new TorreSimulada("Norte", 200, 12, 40),
        new TorreSimulada("Este", 100, 8, 30),
        new TorreSimulada("Oeste", 300, 5, 30),
        new TorreSimulada("Puerta principal", 150, 10, 20),
    ]],
    ["23:00", [
        new TorreSimulada("Norte", 250, 20, 25),
        new TorreSimulada("Este", 100, -1, 30),
        new TorreSimulada("Oeste", 300, 10, 20),
        new TorreSimulada("Puerta principal", 200, 15, 10),
    ]],
    ["23:50", [
        new TorreSimulada("Norte", 900, 45, 4),
        new TorreSimulada("Este", 100, -900, 0),
        new TorreSimulada("Oeste", 300, 40, 6),
        new TorreSimulada("Puerta principal", 200, 60, 2),
    ]],
];

await vigilarNoche(rondasDeLaNoche, [new AvisoBarricada()]);

// === PARTE 5: TESTS ===

function crearRonda(
    torres: number,
    informes: Informe[],
    averiadas: string[] = [],
    sinRespuesta: string[] = [],
): Ronda {
    return {
        torres: torres,
        informes: informes,
        averiadas: averiadas,
        sinRespuesta: sinRespuesta,
    };
}

test("con munición de sobra y sin fallos, la línea resiste", () => {
    const ronda = crearRonda(2, [
        { torre: "Norte", zombis: 10, municion: 40 },
        { torre: "Este", zombis: 5, municion: 30 },
    ]);
    assert.equal(evaluarLinea(ronda), "resiste");
});

test("una torre averiada obliga a pedir refuerzos", () => {
    const ronda = crearRonda(
        3,
        [
            { torre: "Norte", zombis: 10, municion: 40 },
            { torre: "Oeste", zombis: 5, municion: 30 },
        ],
        ["Este"],
    );
    assert.equal(evaluarLinea(ronda), "pide refuerzos");
});

test("con más zombis que munición, la línea está a punto de romper", () => {
    const ronda = crearRonda(1, [
        { torre: "Norte", zombis: 50, municion: 10 },
    ]);
    assert.equal(evaluarLinea(ronda), "a punto de romper");
});

test("sin ningún informe, la línea está a punto de romper", () => {
    assert.equal(evaluarLinea(crearRonda(0, [])), "a punto de romper");
});

test("una torre rápida entrega su informe a tiempo", async () => {
    const informe = await conTiempoMaximo(
        new TorreSimulada("Oeste", 20, 3, 15),
        100,
    );
    assert.deepEqual(informe, { torre: "Oeste", zombis: 3, municion: 15 });
});

test("una torre lenta se rechaza con TorreSinRespuestaError", async () => {
    await assert.rejects(
        conTiempoMaximo(new TorreSimulada("Norte", 200, 5, 10), 50),
        TorreSinRespuestaError,
    );
});

test("recogerInformes coloca cada torre en su sitio", async () => {
    const ronda = await recogerInformes(
        [
            new TorreSimulada("Norte", 20, 6, 12),
            new TorreSimulada("Este", 20, -1, 30),
            new TorreSimulada("Oeste", 300, 4, 8),
        ],
        100,
    );
    assert.equal(ronda.torres, 3);
    assert.deepEqual(ronda.informes, [
        { torre: "Norte", zombis: 6, municion: 12 },
    ]);
    assert.deepEqual(ronda.averiadas, ["Este"]);
    assert.deepEqual(ronda.sinRespuesta, ["Oeste"]);
});
