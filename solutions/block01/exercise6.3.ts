// Ejercicio 6.3: Búsqueda de refugio de emergencia.

// Situación de emergencia: la horda se acerca.
let energiaRestante: number = 10;
let edificiosRevisados: number = 0;
let refugioEncontrado: boolean = false;

console.log("=== BÚSQUEDA DE REFUGIO DE EMERGENCIA ===");

for (let edificio = 1; edificio <= 12; edificio++) {
    // Los múltiplos de 4 tienen la entrada derrumbada.
    if (edificio % 4 === 0) {
        console.log(`Edificio ${edificio}: entrada derrumbada, lo saltas.`);
        continue;
    }

    energiaRestante -= 2;
    edificiosRevisados++;
    console.log(`Edificio ${edificio}: revisado. Energía: ${energiaRestante}`);

    if (Math.random() < 0.25) {
        refugioEncontrado = true;
        console.log(`El edificio ${edificio} es seguro. Te atrincheras.`);
        break;
    }

    if (energiaRestante <= 0) {
        console.log("No te quedan fuerzas para seguir buscando.");
        break;
    }
}

console.log(`Edificios revisados: ${edificiosRevisados}`);
console.log(`Refugio encontrado: ${refugioEncontrado}`);
