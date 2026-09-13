// Ejercicio 8.1: Calculadora de distancias.

// Coordenadas de los refugios en el mapa, en kilómetros.
const refugioPrincipalX: number = 3;
const refugioPrincipalY: number = -4;
const refugioSecundarioX: number = 14;
const refugioSecundarioY: number = 9;

const MINUTOS_POR_KILOMETRO: number = 12;

console.log("=== ANÁLISIS DE DISTANCIA ===");
console.log("Calculando ruta entre refugios...");

const diferenciaX = refugioSecundarioX - refugioPrincipalX;
const diferenciaY = refugioSecundarioY - refugioPrincipalY;

// Al elevar al cuadrado, el signo de las diferencias da igual.
const distancia = Math.sqrt(diferenciaX ** 2 + diferenciaY ** 2);
const distanciaHypot = Math.hypot(diferenciaX, diferenciaY);

console.log(`Distancia exacta: ${distancia.toFixed(1)} km`);
console.log(`Con Math.hypot(): ${distanciaHypot.toFixed(1)} km`);
console.log(`Distancia redondeada: ${Math.round(distancia)} km`);

// Duración a pie en horas y minutos.
const minutosTotales = Math.floor(distancia * MINUTOS_POR_KILOMETRO);
const horas = Math.floor(minutosTotales / 60);
const minutos = minutosTotales % 60;
console.log(`Duración a pie: ${horas} h ${minutos} min`);
