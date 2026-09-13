// Ejercicio 4.1: Calculadora de recursos.

// Estado inicial del campamento tras tres días de organización.
let litrosAguaTotal: number = 45;
let racionesComidaTotal: number = 30;
let diasMision: number = 8;
let consumoAguaDiario: number = 2; // Litros al día.
let consumoComidaDiario: number = 1.5; // Raciones al día.

// Días que dura cada recurso por separado.
let diasAgua: number = litrosAguaTotal / consumoAguaDiario;
let diasComida: number = racionesComidaTotal / consumoComidaDiario;

// Lo que hace falta para toda la misión.
let aguaNecesaria: number = consumoAguaDiario * diasMision;
let comidaNecesaria: number = consumoComidaDiario * diasMision;

// Lo que tienes menos lo que necesitas. Si es negativo, te falta.
let diferenciaAgua: number = litrosAguaTotal - aguaNecesaria;
let diferenciaComida: number = racionesComidaTotal - comidaNecesaria;

// Porcentaje de cada recurso que se gasta en un día.
let porcentajeAguaDiario: number =
    (consumoAguaDiario / litrosAguaTotal) * 100;
let porcentajeComidaDiario: number =
    (consumoComidaDiario / racionesComidaTotal) * 100;

console.log("=== ANÁLISIS DE RECURSOS DEL REFUGIO ===");
console.log(`El agua dura ${diasAgua} días y la comida, ${diasComida}.`);
console.log(`Agua necesaria para ${diasMision} días: ${aguaNecesaria} litros.`);
console.log(`Comida necesaria: ${comidaNecesaria} raciones.`);
console.log(`Diferencia de agua: ${diferenciaAgua} litros.`);
console.log(`Diferencia de comida: ${diferenciaComida} raciones.`);
console.log(`Gasto diario de agua: ${porcentajeAguaDiario.toFixed(2)} %`);
console.log(`Gasto diario de comida: ${porcentajeComidaDiario.toFixed(2)} %`);
