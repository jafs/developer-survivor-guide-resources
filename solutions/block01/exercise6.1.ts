// Ejercicio 6.1: Patrullaje nocturno.

// Estado inicial del patrullaje.
let energia: number = 8;
let zonasRevisadas: number = 0;
let amenazasDetectadas: number = 0;
let horaInicio: number = 22; // 22:00 horas.

console.log("=== INICIANDO PATRULLAJE NOCTURNO ===");
console.log(`Hora de inicio: ${horaInicio}:00`);
console.log("Equipamiento verificado. Comenzando ronda...");

while (energia > 0) {
    // Cada zona lleva una hora. Después de las 23:00 vienen las 0:00.
    let horaRevision: number = (horaInicio + zonasRevisadas) % 24;
    zonasRevisadas++;
    energia--;
    console.log(`${horaRevision}:00 - Revisando la zona ${zonasRevisadas}`);

    if (Math.random() < 0.2) {
        amenazasDetectadas++;
        energia--;
        console.log("  Amenaza zombi detectada. Gastas energía extra.");
    }

    // La energía nunca queda por debajo de 0.
    if (energia < 0) {
        energia = 0;
    }
    console.log(`  Energía restante: ${energia}`);
}

console.log("=== PATRULLAJE COMPLETADO ===");
console.log(`Zonas revisadas: ${zonasRevisadas}`);
console.log(`Amenazas zombis detectadas: ${amenazasDetectadas}`);
