// Ejercicio 11.2: Sistema de comunicación entre refugios.

// Sistema de refugios con Maps.
const estadoComunicaciones: Map<string, string> = new Map([
    ["ALFA", "Comunicación clara"],
    ["BRAVO", "Señal débil"],
    ["CHARLIE", "Sin respuesta"],
]);

const distanciasRefugios: Map<string, number> = new Map([
    ["ALFA", 12.8],
    ["BRAVO", 7.2],
    ["CHARLIE", 27.9],
]);

// Un Set no guarda duplicados, aunque se añada dos veces el mismo nombre.
const refugiosNuevos: Set<string> = new Set();
const refugiosCaidos: Set<string> = new Set();

function conectarRefugio(
    nombre: string,
    estado: string,
    distancia: number,
): void {
    estadoComunicaciones.set(nombre, estado);
    distanciasRefugios.set(nombre, distancia);
    refugiosNuevos.add(nombre);
    console.log(`Nuevo refugio "${nombre}" conectado: ${estado}`);
}

function cambiarEstado(nombre: string, estado: string): void {
    if (!estadoComunicaciones.has(nombre)) {
        console.log(`No existe el refugio "${nombre}"`);
        return;
    }
    estadoComunicaciones.set(nombre, estado);
    console.log(`Refugio "${nombre}" cambia a: ${estado}`);
}

function darDeBaja(nombre: string): void {
    estadoComunicaciones.delete(nombre);
    distanciasRefugios.delete(nombre);
    refugiosCaidos.add(nombre);
    console.log(`Refugio "${nombre}" dado de baja`);
}

function consultarEstado(nombre: string): string {
    return estadoComunicaciones.get(nombre) ?? "Refugio desconocido";
}

function mostrarInforme(): void {
    console.log("\n=== ESTADO DE LA RED DE REFUGIOS ===");

    let sumaDistancias = 0;
    for (const [nombre, estado] of estadoComunicaciones) {
        const distancia = distanciasRefugios.get(nombre) ?? 0;
        sumaDistancias += distancia;
        console.log(`${nombre}: ${estado} (${distancia} km)`);
    }

    const activos = estadoComunicaciones.size;
    const media = activos === 0 ? 0 : sumaDistancias / activos;
    console.log(`Distancia media: ${media.toFixed(1)} km`);
    console.log(`Refugios nuevos: ${Array.from(refugiosNuevos).join(", ")}`);
    console.log(`Refugios caídos: ${Array.from(refugiosCaidos).join(", ")}`);
}

console.log("=== ACTUALIZANDO RED DE REFUGIOS ===");

conectarRefugio("DELTA", "Comunicación clara", 18.4);
cambiarEstado("BRAVO", "Comunicación con interferencias");
darDeBaja("CHARLIE");
darDeBaja("CHARLIE");
console.log(`Estado de ECO: ${consultarEstado("ECO")}`);

mostrarInforme();
