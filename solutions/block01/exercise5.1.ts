// Ejercicio 5.1: Sistema de racionamiento.

// Estado de los suministros.
let racionesDisponibles: number = 18;
let diasRestantes: number = 6;

// Calcula las raciones por día.
let racionesPorDia: number = 0;

console.log("=== SISTEMA DE RACIONAMIENTO ===");

if (diasRestantes === 0) {
    console.log("No quedan días que planificar. Revisa los datos.");
} else {
    racionesPorDia = racionesDisponibles / diasRestantes;
    let nivelRacionamiento: string = "";

    if (racionesPorDia >= 1.5) {
        nivelRacionamiento = "abundante";
    } else if (racionesPorDia >= 1.0) {
        nivelRacionamiento = "normal";
    } else if (racionesPorDia >= 0.7) {
        nivelRacionamiento = "reducido";
    } else {
        nivelRacionamiento = "crítico";
    }

    console.log(`Raciones por día: ${racionesPorDia.toFixed(2)}`);
    console.log(`Nivel de racionamiento: ${nivelRacionamiento}`);
}
