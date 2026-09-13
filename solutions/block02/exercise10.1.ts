// Ejercicio 10.1: Decodificador de mensajes de emergencia.

const mensajesInterceptados: string[] = [
    "  REFUGIO alpha - COMPROMETIDO  ",
    "supervivientes ana,diego,julia - 3   ",
    " Coordenadas 40.7128,-74.0060 - almacén abandonado",
    "   COMBUSTIBLE 15.7 - reponer ",
];

// Deja la primera letra en mayúscula y el resto en minúscula.
function capitalizar(texto: string): string {
    return texto.slice(0, 1).toUpperCase() + texto.slice(1).toLowerCase();
}

function procesarRefugio(dato: string, detalle: string): void {
    console.log(`  Refugio: ${capitalizar(dato)}`);
    console.log(`  Estado: ${detalle.toLowerCase()}`);
}

function procesarSupervivientes(dato: string, detalle: string): void {
    const nombres = dato.split(",").map((nombre) => capitalizar(nombre.trim()));
    console.log(`  Supervivientes: ${nombres.join(", ")}`);
    console.log(`  Total: ${detalle}`);
}

function procesarCoordenadas(dato: string, detalle: string): void {
    const coordenadas = dato.split(",");
    if (coordenadas.length !== 2) {
        console.log("  Error: formato de coordenadas no válido");
        return;
    }

    const latitud = coordenadas[0].trim();
    const longitud = coordenadas[1].trim();
    console.log(`  Coordenadas: Latitud ${latitud} - Longitud ${longitud}`);
    console.log(`  Ubicación: ${capitalizar(detalle)}`);
}

function procesarCombustible(dato: string, detalle: string): void {
    console.log(`  Combustible: ${dato} litros restantes`);
    console.log(`  Acción: ${detalle}`);
}

function decodificarMensaje(mensaje: string): void {
    // Formato: "TIPO datos_principales - información_detallada".
    const partes = mensaje.trim().split(" - ");
    if (partes.length !== 2) {
        console.log("  Error: formato de mensaje no válido");
        return;
    }

    const cabecera = partes[0].trim();
    const detalle = partes[1].trim();

    // El tipo es la primera palabra y el dato principal, el resto.
    const posicionEspacio = cabecera.indexOf(" ");
    if (posicionEspacio === -1) {
        console.log("  Error: falta el dato principal");
        return;
    }
    const tipo = cabecera.slice(0, posicionEspacio).toLowerCase();
    const dato = cabecera.slice(posicionEspacio + 1).trim();

    console.log(`Tipo: ${tipo.toUpperCase()}`);
    switch (tipo) {
        case "refugio":
            procesarRefugio(dato, detalle);
            break;
        case "supervivientes":
            procesarSupervivientes(dato, detalle);
            break;
        case "coordenadas":
            procesarCoordenadas(dato, detalle);
            break;
        case "combustible":
            procesarCombustible(dato, detalle);
            break;
        default:
            console.log("  No se pudo identificar el tipo de mensaje");
    }
}

console.log("=== DECODIFICACIÓN DE MENSAJES ===");
console.log("Procesando transmisiones interceptadas...");

mensajesInterceptados.forEach((mensaje, indice) => {
    console.log(`\n--- Mensaje ${indice + 1} ---`);
    decodificarMensaje(mensaje);
});
