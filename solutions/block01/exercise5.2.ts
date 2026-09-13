// Ejercicio 5.2: Protocolo de emergencia.

// Tipo de emergencia detectada.
let tipoEmergencia: string = "intrusión"; // Cambia este valor para probar.

// Variables de respuesta.
let equipoRequerido: string = "";
let accionInmediata: string = "";

switch (tipoEmergencia) {
    // La horda y la intrusión comparten respuesta.
    case "horda":
    case "intrusión":
        equipoRequerido = "arma";
        accionInmediata = "bloquear las entradas";
        break;
    case "fuego":
        equipoRequerido = "extintor";
        accionInmediata = "apagar el incendio";
        break;
    case "tormenta":
        equipoRequerido = "maderas";
        accionInmediata = "reforzar las barricadas";
        break;
    default:
        equipoRequerido = "linterna";
        accionInmediata = "evaluar la situación";
        break;
}

let nivelAlerta: string = equipoRequerido === "arma" ? "máxima" : "normal";

console.log("=== PROTOCOLO DE EMERGENCIA ACTIVADO ===");
console.log(`Emergencia: ${tipoEmergencia}`);
console.log(`Equipo requerido: ${equipoRequerido}`);
console.log(`Acción inmediata: ${accionInmediata}`);
console.log(`Nivel de alerta: ${nivelAlerta}`);
