// Ejercicio 8.2: Procesador de datos de sensores.

// Totales que irá actualizando registrarLectura().
let lecturasValidas: number = 0;
let lecturasDefectuosas: number = 0;
let sumaTemperaturas: number = 0;

function registrarLectura(lectura: string): void {
    // parseFloat() lee el número del principio y descarta el resto.
    const temperatura = parseFloat(lectura);

    if (Number.isNaN(temperatura)) {
        lecturasDefectuosas++;
        console.log(`"${lectura}": sensor defectuoso`);
        return;
    }

    lecturasValidas++;
    sumaTemperaturas += temperatura;
    console.log(`"${lectura}": ${temperatura.toFixed(1)} grados`);
}

console.log("=== REPORTE DE SENSORES ===");
console.log("Procesando lecturas de los sensores de temperatura...");

registrarLectura("23.7");
registrarLectura("error");
registrarLectura("18.5 grados");
registrarLectura("sin señal");
registrarLectura("21.3");
registrarLectura("");
registrarLectura("-2.8");

console.log(`Lecturas válidas: ${lecturasValidas}`);
console.log(`Lecturas defectuosas: ${lecturasDefectuosas}`);

// Caso extremo: sin lecturas válidas no hay media.
if (lecturasValidas === 0) {
    console.log("No hay lecturas válidas: no se puede calcular la media.");
} else {
    const media = sumaTemperaturas / lecturasValidas;
    console.log(`Temperatura media: ${media.toFixed(1)} grados`);
}
