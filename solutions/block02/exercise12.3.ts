// Ejercicio 12.3: Sistema de navegación entre refugios.

// [nombre, latitud, longitud]
type Refugio = readonly [string, number, number];

const refugioNorte: Refugio = ["Refugio Norte", 41.2, -75.1];
const refugioCentral: Refugio = ["Refugio Central", 41.0, -75.0];
const refugioSur: Refugio = ["Refugio Sur", 40.8, -74.9];
const refugios: Refugio[] = [refugioNorte, refugioCentral, refugioSur];

// Diferencias en grados, siempre positivas.
function calcularDiferencia(
    origen: Refugio,
    destino: Refugio,
): [number, number] {
    const diferenciaLatitud = Math.abs(origen[1] - destino[1]);
    const diferenciaLongitud = Math.abs(origen[2] - destino[2]);
    return [diferenciaLatitud, diferenciaLongitud];
}

function refugioMasAlNorte(lista: Refugio[]): string {
    if (lista.length === 0) {
        return "Sin refugios registrados";
    }

    let masAlNorte = lista[0];
    for (const refugio of lista) {
        if (refugio[1] > masAlNorte[1]) {
            masAlNorte = refugio;
        }
    }
    return masAlNorte[0];
}

console.log("=== SISTEMA DE NAVEGACIÓN ENTRE REFUGIOS ===");
console.log("Calculando rutas y distancias para expediciones seguras...");

console.log("Refugios registrados en el sistema:");
for (const refugio of refugios) {
    const [nombre, latitud, longitud] = refugio;
    console.log(`- ${nombre}: latitud ${latitud}, longitud ${longitud}`);
}

const [diferenciaLatitud, diferenciaLongitud] = calcularDiferencia(
    refugioNorte,
    refugioSur,
);
console.log(
    `\nNorte - Sur: ${diferenciaLatitud.toFixed(1)} grados de latitud y ` +
    `${diferenciaLongitud.toFixed(1)} de longitud`
);
console.log(`Refugio más al norte: ${refugioMasAlNorte(refugios)}`);
