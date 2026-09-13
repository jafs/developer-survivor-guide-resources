// Ejercicio 4.3: Lógica de supervivencia.

// Condiciones actuales.
let generadorFuncional: boolean = true;
let perimetroSeguro: boolean = true;
let climaEstable: boolean = false;
let comunicacionActiva: boolean = true;
let racionesDisponibles: number = 6;
let litrosCombustible: number = 9;
let zonaSenalSegura: boolean = false;

// Datos del viaje hasta el origen de la señal.
let horasAusencia: number = 8;
let consumoGeneradorPorHora: number = 1; // Litros por hora.

let puedesSalir: boolean =
    perimetroSeguro && (climaEstable || comunicacionActiva);
let refugioEnModoCritico: boolean =
    !generadorFuncional || racionesDisponibles < 3;
let combustibleSuficiente: boolean =
    litrosCombustible >= horasAusencia * consumoGeneradorPorHora;
let mereceInvestigar: boolean =
    puedesSalir &&
    !refugioEnModoCritico &&
    combustibleSuficiente &&
    (zonaSenalSegura || racionesDisponibles >= 4);

console.log("=== ANÁLISIS DE SEÑAL DE AUXILIO ===");
console.log(`Puedes salir: ${puedesSalir}`);
console.log(`Refugio en modo crítico: ${refugioEnModoCritico}`);
console.log(`Combustible suficiente: ${combustibleSuficiente}`);
console.log(`Merece la pena investigar: ${mereceInvestigar}`);
