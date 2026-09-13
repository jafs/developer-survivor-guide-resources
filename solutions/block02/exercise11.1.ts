// Ejercicio 11.1: Inventario de suministros básico.

// Inventario de la central antes de la expedición.
const inventarioCentral: Map<string, number> = new Map([
    ["comida enlatada", 20],
    ["agua", 30],
]);

// Suministros que trae la expedición.
const suministrosEncontrados: Map<string, number> = new Map([
    ["comida enlatada", 15],
    ["vendas médicas", 8],
    ["baterías", 4],
    ["agua", 12],
]);

// Suma lo encontrado a lo que ya había, o lo añade si es nuevo.
function anadirSuministros(
    inventario: Map<string, number>,
    nuevos: Map<string, number>,
): void {
    for (const [suministro, cantidad] of nuevos) {
        const actual = inventario.get(suministro) ?? 0;
        inventario.set(suministro, actual + cantidad);
    }
}

function contarUnidades(inventario: Map<string, number>): number {
    let total = 0;
    for (const cantidad of inventario.values()) {
        total += cantidad;
    }
    return total;
}

// Devuelve 0 si el suministro no está registrado.
function consultarCantidad(
    inventario: Map<string, number>,
    suministro: string,
): number {
    return inventario.get(suministro) ?? 0;
}

function mostrarInforme(inventario: Map<string, number>): void {
    console.log("\n=== REPORTE DE EXPEDICIÓN ===");
    for (const [suministro, cantidad] of inventario) {
        console.log(`${suministro}: ${cantidad}`);
    }
    console.log(`Tipos de suministro: ${inventario.size}`);
    console.log(`Total de unidades: ${contarUnidades(inventario)}`);
}

console.log("=== CATALOGANDO SUMINISTROS ENCONTRADOS ===");

anadirSuministros(inventarioCentral, suministrosEncontrados);
mostrarInforme(inventarioCentral);

console.log(`\nAgua: ${consultarCantidad(inventarioCentral, "agua")}`);
console.log(`Linternas: ${consultarCantidad(inventarioCentral, "linternas")}`);
