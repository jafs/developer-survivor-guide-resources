// Ejercicio 19.1: Reparto de gasóleo.

function repartirGasoleo(litros: number, generadores: number): number {
    if (litros < 0) {
        throw new Error(`Los litros no pueden ser negativos: ${litros}`);
    }
    if (!Number.isInteger(generadores) || generadores <= 0) {
        throw new Error(
            `Los generadores deben ser un entero mayor que 0: ${generadores}`
        );
    }
    return litros / generadores;
}

const repartosDeLaSemana: [number, number][] = [
    [120, 4],
    [-20, 3],
    [50, 0],
    [0, 2],
    [60, 2.5],
    [100, 3],
];

let rechazados = 0;

for (const [litros, generadores] of repartosDeLaSemana) {
    try {
        const porGenerador = repartirGasoleo(litros, generadores);
        console.log(
            `${litros} litros entre ${generadores} generadores: ` +
            `${porGenerador.toFixed(1)} litros cada uno`
        );
    } catch (error) {
        rechazados++;
        const motivo = error instanceof Error ? error.message : "desconocido";
        console.log(`Reparto rechazado. ${motivo}`);
    }
}

console.log(`Repartos rechazados: ${rechazados}`);
