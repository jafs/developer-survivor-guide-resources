// Ejercicio 7.2: Sistema de turnos de vigilancia.

const EQUIPO_ZONA_SEGURA: string = "linterna";
const EQUIPO_ZONA_RIESGO_MEDIO: string = "linterna y ballesta";
const EQUIPO_ZONA_PELIGROSA: string = "linterna, ballesta y bengalas";

function asignarTurno(
    nombre: string,
    hora: number,
    duracion: number = 4,
    equipo: string = EQUIPO_ZONA_SEGURA,
): string {
    // Se comprueban los errores antes de preparar el mensaje.
    if (nombre === "") {
        return "Error: no has dicho quién va a realizar el turno";
    }
    if (hora < 0 || hora > 23) {
        return "Error: la hora debe estar entre 0 y 23";
    }
    if (duracion < 1) {
        return "Error: la duración debe ser como mínimo de 1 hora";
    }

    return `${nombre} comienza su turno de vigilancia a las ${hora} horas.\n` +
        `  Patrullará durante ${duracion} horas\n` +
        `  Su equipo será: ${equipo}`;
}

console.log("=== SISTEMA DE TURNOS DE VIGILANCIA ===");

console.log(asignarTurno("Ana", 14, 6, EQUIPO_ZONA_RIESGO_MEDIO));
console.log(asignarTurno("Diego", 2)); // Duración y equipo por defecto.
console.log(asignarTurno("Julia", 22, 3, EQUIPO_ZONA_PELIGROSA));
console.log(asignarTurno("", 8, 2)); // Error: sin nombre.
console.log(asignarTurno("Marcos", 25)); // Error: hora incorrecta.
console.log(asignarTurno("Julia", 10, 0)); // Error: duración incorrecta.
