// Ejercicio 4.2: Sistema de alerta temprana.

// Lecturas actuales de los sensores durante la tormenta.
let temperatura: number = -12;
let vientoKmh: number = 35;
let visibilidadMetros: number = 150;
let nivelCombustible: number = 18; // Porcentaje.
let horaActual: number = 22;

// Una alerta por cada umbral.
let temperaturaPeligrosa: boolean = temperatura < -10;
let vientoExtremo: boolean = vientoKmh > 40;
let visibilidadCritica: boolean = visibilidadMetros < 100;
let combustibleEnReserva: boolean = nivelCombustible < 20;
let horarioAltoRiesgo: boolean = horaActual >= 21;

// Resultados combinados.
let hayAlerta: boolean = temperaturaPeligrosa || vientoExtremo ||
    visibilidadCritica || combustibleEnReserva || horarioAltoRiesgo;
let evacuacionInmediata: boolean =
    (temperaturaPeligrosa && vientoExtremo) ||
    (combustibleEnReserva && horarioAltoRiesgo);

console.log("=== SISTEMA DE ALERTAS DE EMERGENCIA ===");
console.log(`Temperatura peligrosa: ${temperaturaPeligrosa}`);
console.log(`Viento extremo: ${vientoExtremo}`);
console.log(`Visibilidad crítica: ${visibilidadCritica}`);
console.log(`Combustible en reserva: ${combustibleEnReserva}`);
console.log(`Horario de alto riesgo: ${horarioAltoRiesgo}`);
console.log(`Hay alguna alerta activa: ${hayAlerta}`);
console.log(`Evacuación inmediata: ${evacuacionInmediata}`);
