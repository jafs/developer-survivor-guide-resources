// Ejercicio 19.2: Revisión de la sala de generadores.

type Generador = {
    nombre: string;
    litros: number;
    temperaturaMotor: number;
};

class SinGasoleoError extends Error {
    public readonly generador: string;

    public constructor(generador: string) {
        super(`El generador ${generador} no tiene gasóleo`);
        this.name = "SinGasoleoError";
        this.generador = generador;
    }
}

class MotorCongeladoError extends Error {
    public readonly generador: string;
    public readonly temperatura: number;

    public constructor(generador: string, temperatura: number) {
        super(`El motor del generador ${generador} está congelado`);
        this.name = "MotorCongeladoError";
        this.generador = generador;
        this.temperatura = temperatura;
    }
}

const TEMPERATURA_MINIMA_MOTOR = -10;

function arrancarGenerador(generador: Generador): void {
    if (generador.litros <= 0) {
        throw new SinGasoleoError(generador.nombre);
    }
    if (generador.temperaturaMotor < TEMPERATURA_MINIMA_MOTOR) {
        throw new MotorCongeladoError(
            generador.nombre,
            generador.temperaturaMotor
        );
    }
    console.log(`Generador ${generador.nombre} en marcha`);
}

function revisarSala(generadores: Generador[]): void {
    console.log("Luz de la sala encendida");
    let arrancados = 0;

    try {
        for (const generador of generadores) {
            try {
                arrancarGenerador(generador);
                arrancados++;
            } catch (error) {
                // Solo se atiende la falta de gasóleo. El resto sigue.
                if (!(error instanceof SinGasoleoError)) {
                    throw error;
                }
                console.log(`${error.message}. Se pasa al siguiente`);
            }
        }
    } finally {
        console.log(
            `Luz de la sala apagada. Generadores en marcha: ${arrancados}`
        );
    }
}

const salaGeneradores: Generador[] = [
    { nombre: "Principal", litros: 40, temperaturaMotor: 2 },
    { nombre: "Auxiliar", litros: 0, temperaturaMotor: 1 },
    { nombre: "Torres", litros: 25, temperaturaMotor: -14 },
    { nombre: "Enfermería", litros: 30, temperaturaMotor: 3 },
];

try {
    revisarSala(salaGeneradores);
} catch (error) {
    if (error instanceof MotorCongeladoError) {
        console.log(
            `Revisión interrumpida en el generador ${error.generador}: ` +
            `motor a ${error.temperatura} °C`
        );
    } else {
        console.log("Revisión interrumpida por un error inesperado:", error);
    }
}
