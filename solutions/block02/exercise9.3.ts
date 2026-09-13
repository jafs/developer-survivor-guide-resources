// Ejercicio 9.3: Planificación de rutas seguras.

const RIESGO_MAXIMO_SEGURO: number = 15;

// Mapa de peligros del área cercana al refugio.
const mapaPeligros: number[][] = [
    [1, 2, 4, 3],
    [3, 5, 8, 6],
    [2, 4, 9, 7],
    [1, 3, 5, 4],
];

// Acerca una coordenada una posición a su destino.
function avanzar(actual: number, destino: number): number {
    if (actual < destino) {
        return actual + 1;
    }
    if (actual > destino) {
        return actual - 1;
    }
    return actual;
}

function planificarRuta(
    mapa: number[][],
    origen: number[],
    destino: number[],
): void {
    let fila = origen[0];
    let columna = origen[1];
    const camino: number[][] = [[fila, columna]];
    let riesgoTotal = mapa[fila][columna];

    while (fila !== destino[0] || columna !== destino[1]) {
        fila = avanzar(fila, destino[0]);
        columna = avanzar(columna, destino[1]);
        camino.push([fila, columna]);
        riesgoTotal += mapa[fila][columna];
    }

    const textoCamino = camino
        .map((posicion) => `[${posicion.join(", ")}]`)
        .join(" - ");
    const esSegura = riesgoTotal <= RIESGO_MAXIMO_SEGURO;

    console.log(`Camino: ${textoCamino}`);
    console.log(`Riesgo total: ${riesgoTotal}`);
    console.log(`Ruta ${esSegura ? "segura" : "peligrosa"}`);
}

console.log("=== PLANIFICADOR DE RUTAS SEGURAS ===");
console.log("Analizando rutas para expediciones críticas...");

console.log("\nRescate de un superviviente:");
planificarRuta(mapaPeligros, [0, 0], [2, 3]);

console.log("\nExpedición por suministros médicos:");
planificarRuta(mapaPeligros, [1, 1], [3, 2]);

console.log("\nRecogida de leña por el borde sur:");
planificarRuta(mapaPeligros, [3, 0], [3, 3]);
