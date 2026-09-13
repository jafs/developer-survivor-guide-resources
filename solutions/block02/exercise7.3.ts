// Ejercicio 7.3: Exploración recursiva.

const EXTINTORES_POR_SUPERVIVIENTE: number = 2;

function explorarEdificio(
    planta: number,
    plantaMaxima: number,
    supervivientes: number,
    informar: (planta: number, extintores: number) => void,
    extintores: number = 0,
): number {
    const capacidad = supervivientes * EXTINTORES_POR_SUPERVIVIENTE;

    // Caso base: no quedan plantas o ya no cabe ningún extintor más.
    if (planta > plantaMaxima || extintores >= capacidad) {
        return extintores;
    }

    // Plantas pares: 2 extintores. Impares: 1. Solo se cogen los que caben.
    const extintoresEnPlanta = planta % 2 === 0 ? 2 : 1;
    const hueco = capacidad - extintores;
    const recogidos = extintoresEnPlanta < hueco ? extintoresEnPlanta : hueco;
    const total = extintores + recogidos;
    informar(planta, total);

    return explorarEdificio(
        planta + 1,
        plantaMaxima,
        supervivientes,
        informar,
        total,
    );
}

const informarPlanta = (planta: number, extintores: number): void => {
    console.log(`  Planta ${planta}: llevamos ${extintores} extintores`);
};

console.log("=== EXPLORACIÓN RECURSIVA ===");

console.log("--- Edificio pequeño (3 plantas, 3 supervivientes) ---");
const extintoresPequeno = explorarEdificio(1, 3, 3, informarPlanta);
console.log(`Resultado: ${extintoresPequeno} extintores obtenidos`);

console.log("\n--- Rascacielos abandonado (8 plantas, 5 supervivientes) ---");
const extintoresRascacielos = explorarEdificio(1, 8, 5, informarPlanta);
console.log(`Resultado: ${extintoresRascacielos} extintores obtenidos`);

console.log("\n--- Exploración con solo 2 supervivientes (6 plantas) ---");
const extintoresPareja = explorarEdificio(1, 6, 2, informarPlanta);
console.log(`Resultado: ${extintoresPareja} extintores obtenidos`);
