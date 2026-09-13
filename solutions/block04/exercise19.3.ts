// Ejercicio 19.3: Partes de las torres.

class ParteIlegibleError extends Error {
    public readonly linea: string;

    public constructor(linea: string, motivo: string) {
        super(`Parte ilegible "${linea}": ${motivo}`);
        this.name = "ParteIlegibleError";
        this.linea = linea;
    }
}

type Parte = {
    torre: string;
    temperatura: number;
};

const TEMPERATURA_MINIMA = -60;
const TEMPERATURA_MAXIMA = 80;

function interpretarParte(linea: string): Parte | null {
    // Que una torre no mande parte es normal: no es un error.
    if (linea.trim() === "") {
        return null;
    }

    const trozos = linea.split(";");
    if (trozos.length !== 2) {
        throw new ParteIlegibleError(linea, "se esperaban torre y grados");
    }

    const torre = trozos[0].trim();
    const textoGrados = trozos[1].trim();
    if (torre === "") {
        throw new ParteIlegibleError(linea, "falta el nombre de la torre");
    }

    // Number("") da 0, así que los grados vacíos se rechazan antes.
    const temperatura = Number(textoGrados);
    if (textoGrados === "" || Number.isNaN(temperatura)) {
        throw new ParteIlegibleError(linea, "los grados no son un número");
    }
    if (temperatura < TEMPERATURA_MINIMA || temperatura > TEMPERATURA_MAXIMA) {
        throw new ParteIlegibleError(linea, `${temperatura} °C no es posible`);
    }

    return { torre: torre, temperatura: temperatura };
}

function resumirNoche(lineas: string[]): void {
    const validos: Parte[] = [];
    let vacios = 0;
    let ilegibles = 0;

    for (const linea of lineas) {
        try {
            const parte = interpretarParte(linea);
            if (parte === null) {
                vacios++;
            } else {
                validos.push(parte);
            }
        } catch (error) {
            // Solo sabemos qué hacer con un parte ilegible.
            if (!(error instanceof ParteIlegibleError)) {
                throw error;
            }
            ilegibles++;
            console.log(error.message);
        }
    }

    console.log(
        `Partes válidos: ${validos.length}. ` +
        `Vacíos: ${vacios}. Ilegibles: ${ilegibles}`
    );

    if (validos.length === 0) {
        console.log("No ha llegado ningún parte válido");
        return;
    }

    let masFrio = validos[0];
    for (const parte of validos) {
        if (parte.temperatura < masFrio.temperatura) {
            masFrio = parte;
        }
    }
    console.log(
        `Temperatura más baja: ${masFrio.temperatura} °C ` +
        `en la torre ${masFrio.torre}`
    );
}

const partesDeLaNoche: string[] = [
    "Norte;-3",
    "Este;-900",
    "",
    "Sur;-2.5",
    "Oeste;-4;-5",
    "Norte;menos cinco",
    "   ",
    "Sur;",
    "Este;-1",
];

console.log("=== PARTES DE LA NOCHE ===");
resumirNoche(partesDeLaNoche);

console.log("\n=== NOCHE SIN PARTES ===");
resumirNoche([]);
