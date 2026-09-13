// Ejercicio 3.1: Clasificando suministros.

let nombreRefugio: string = "Refugio Alpha";
let temperaturaActual: number = -8.5;
let esZonaSegura: boolean = true;
// Todavía no hay contacto por radio.
let ultimoMensajeRadio: string | null = null;

console.log("=== ESTADO DEL REFUGIO ===");
console.log(`Refugio: ${nombreRefugio}`);
console.log(`Temperatura: ${temperaturaActual} grados`);
console.log(`Tipo de la temperatura: ${typeof temperaturaActual}`);
console.log(`Zona segura: ${esZonaSegura}`);
console.log(`Último mensaje: ${ultimoMensajeRadio}`);

// Por fin llega un mensaje.
ultimoMensajeRadio = "Zona segura en Abenójar";
console.log(`Último mensaje: ${ultimoMensajeRadio}`);
