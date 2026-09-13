// Ejercicio 10.2: Procesador de inventario corrupto.

const datosCorruptos: string =
    "Agua:45.5L;Comida:23kilos;medicinas:156unidades;COMBUSTIBLE:8.9 litros";

console.log("=== RECUPERACIÓN DE INVENTARIO ===");
console.log("Intentando recuperar datos del sistema dañado...");
console.log("Datos corruptos:", datosCorruptos);

// Convierte la unidad, escrita de cualquier forma, en su abreviatura.
function estandarizarUnidad(unidad: string): string {
    switch (unidad.trim().toLowerCase()) {
        case "kilos":
        case "kg":
            return "KG";
        case "litros":
        case "l":
            return "L";
        case "unidades":
        case "u":
            return "U";
        default:
            return unidad.trim().toUpperCase();
    }
}

let nombreMayor = "";
let cantidadMayor = -1;

console.log("\n=== REPORTE DE INVENTARIO RECUPERADO ===");

for (const elemento of datosCorruptos.split(";")) {
    const partes = elemento.split(":");
    if (partes.length !== 2) {
        console.log(`Formato no válido en "${elemento}"`);
        continue;
    }

    const nombreEnBruto = partes[0].trim();
    const nombre = nombreEnBruto.slice(0, 1).toUpperCase() +
        nombreEnBruto.slice(1).toLowerCase();

    // La cantidad es el número del principio y la unidad, lo que queda.
    const coincidencia = partes[1].match(/[\d.]+/);
    if (coincidencia === null) {
        console.log(`Sin cantidad en "${elemento}"`);
        continue;
    }
    const cantidad = parseFloat(coincidencia[0]);
    const unidad = estandarizarUnidad(partes[1].replace(coincidencia[0], ""));

    console.log(`${nombre}: ${cantidad} ${unidad}`);

    // La comparación no tiene en cuenta la unidad.
    if (cantidad > cantidadMayor) {
        cantidadMayor = cantidad;
        nombreMayor = nombre;
    }
}

console.log(`\nSuministro con la cantidad más alta: ${nombreMayor}`);
