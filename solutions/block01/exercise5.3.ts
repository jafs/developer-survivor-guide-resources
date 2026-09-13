// Ejercicio 5.3: Evaluador de refugio.

// Características del refugio encontrado.
let materialEstructura: string = "madera"; // "madera", "piedra", "metal"
let superficieMetros: number = 25; // Metros cuadrados.
let tieneAgua: boolean = true;
let tieneTecho: boolean = true;
let estadoGeneral: string = "regular"; // "excelente", "bueno", "regular"...

let puntuacion: number = 0;

// Material.
if (materialEstructura === "piedra" || materialEstructura === "metal") {
    puntuacion += 30;
} else if (materialEstructura === "madera") {
    puntuacion += 20;
} else {
    puntuacion += 10;
}

// Superficie.
if (superficieMetros > 30) {
    puntuacion += 20;
} else if (superficieMetros >= 20) {
    puntuacion += 15;
} else if (superficieMetros >= 10) {
    puntuacion += 10;
} else {
    puntuacion += 5;
}

// Agua y techo.
puntuacion += tieneAgua ? 15 : 0;
puntuacion += tieneTecho ? 15 : 0;

// Estado general.
if (estadoGeneral === "excelente") {
    puntuacion += 20;
} else if (estadoGeneral === "bueno") {
    puntuacion += 15;
} else if (estadoGeneral === "regular") {
    puntuacion += 10;
} else {
    puntuacion += 5;
}

// Recomendación según la puntuación total.
let recomendacion: string = "";
if (puntuacion >= 80) {
    recomendacion = "Refugio ideal - establecer base permanente";
} else if (puntuacion >= 60) {
    recomendacion = "Refugio bueno - apto para estancia prolongada";
} else if (puntuacion >= 40) {
    recomendacion = "Refugio aceptable - usar temporalmente";
} else {
    recomendacion = "Refugio inadecuado - buscar alternativa";
}

console.log("=== EVALUACIÓN DE REFUGIO ===");
console.log(`Puntuación: ${puntuacion}/100`);
console.log(`Recomendación: ${recomendacion}`);
