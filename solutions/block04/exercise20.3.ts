// Ejercicio 20.3: Turnos en el pozo.

// === WALKIE VIEJO (DEL ENUNCIADO) ===

class WalkieViejo {
    public pedirTurno(
        equipo: string,
        alResponder: (error: Error | null, turno: string) => void,
    ): void {
        setTimeout(() => {
            if (equipo === "") {
                alResponder(new Error("Walkie sin identificar"), "");
                return;
            }
            alResponder(null, `Turno concedido a ${equipo}`);
        }, 100);
    }
}

// === ADAPTADOR ===

class WalkieConPromesas {
    private walkie: WalkieViejo;

    public constructor(walkie: WalkieViejo) {
        this.walkie = walkie;
    }

    public pedirTurno(equipo: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.walkie.pedirTurno(equipo, (error, turno) => {
                if (error !== null) {
                    reject(error);
                    return;
                }
                resolve(turno);
            });
        });
    }
}

// === SEMÁFORO ===

class Semaforo {
    private readonly plazas: number;
    private plazasLibres: number;
    private enEspera: (() => void)[] = [];

    public constructor(plazas: number) {
        this.plazas = plazas;
        this.plazasLibres = plazas;
    }

    public get ocupadas(): number {
        return this.plazas - this.plazasLibres;
    }

    public async adquirir(): Promise<void> {
        if (this.plazasLibres > 0) {
            this.plazasLibres--;
            return;
        }
        // La plaza la entrega liberar() al llamar a este resolve.
        await new Promise<void>((resolve) => this.enEspera.push(resolve));
    }

    public liberar(): void {
        const siguiente = this.enEspera.shift();
        if (siguiente === undefined) {
            this.plazasLibres++;
            return;
        }
        siguiente();
    }
}

// === OBSERVADORES ===

interface ObservadorPozo {
    avisarNivelBajo(litros: number): void;
}

class AvisoDiego implements ObservadorPozo {
    public avisarNivelBajo(litros: number): void {
        console.log(`Diego: quedan ${litros} litros, hay que revisar la bomba`);
    }
}

class AvisoJulia implements ObservadorPozo {
    public avisarNivelBajo(litros: number): void {
        console.log(
            `Julia: quedan ${litros} litros, ` +
            "hay que llenar la reserva de la enfermería"
        );
    }
}

// === POZO ===

const NIVEL_MINIMO = 100;

class Pozo {
    private litros: number = 200;
    private observadores: ObservadorPozo[] = [];

    public get litrosDisponibles(): number {
        return this.litros;
    }

    public suscribir(observador: ObservadorPozo): void {
        this.observadores.push(observador);
    }

    // Lee y escribe sin ningún await en medio: no hay condición de carrera.
    public sacar(litros: number): number {
        const sacados = Math.min(litros, this.litros);
        this.litros -= sacados;
        if (this.litros < NIVEL_MINIMO) {
            for (const observador of this.observadores) {
                observador.avisarNivelBajo(this.litros);
            }
        }
        return sacados;
    }
}

// === TURNOS ===

const esperar = (milisegundos: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, milisegundos));

const walkie = new WalkieConPromesas(new WalkieViejo());
const plazasPozo = new Semaforo(2);
const pozoPatio = new Pozo();
pozoPatio.suscribir(new AvisoDiego());
pozoPatio.suscribir(new AvisoJulia());

async function irAlPozo(
    equipo: string,
    litros: number,
    milisegundos: number,
): Promise<void> {
    console.log(await walkie.pedirTurno(equipo));
    await plazasPozo.adquirir();
    try {
        console.log(
            `${equipo} baja al pozo. Equipos en el pozo: ` +
            `${plazasPozo.ocupadas}`
        );
        await esperar(milisegundos);
        const sacados = pozoPatio.sacar(litros);
        console.log(`${equipo} sube con ${sacados} litros`);
    } finally {
        plazasPozo.liberar();
    }
}

await Promise.all([
    irAlPozo("Ana", 40, 300),
    irAlPozo("Julia", 50, 200),
    irAlPozo("Marcos", 30, 100),
    irAlPozo("Amaia", 60, 200),
]);

console.log(`Quedan ${pozoPatio.litrosDisponibles} litros en el pozo`);
