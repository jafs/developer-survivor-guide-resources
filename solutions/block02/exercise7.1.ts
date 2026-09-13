// Ejercicio 7.1: Calculadora de supervivencia.

const LITROS_AGUA_POR_PERSONA_DIA: number = 2.5;
const RACIONES_POR_PERSONA_DIA: number = 3;

// Días completos que dura el agua.
function calcularDiasConAgua(personas: number, litrosAgua: number): number {
    if (personas === 0) {
        return 0;
    }
    const consumoDiario = personas * LITROS_AGUA_POR_PERSONA_DIA;
    return Math.floor(litrosAgua / consumoDiario);
}

// Días completos que dura la comida.
function calcularDiasConComida(personas: number, raciones: number): number {
    if (personas === 0) {
        return 0;
    }
    const consumoDiario = personas * RACIONES_POR_PERSONA_DIA;
    return Math.floor(raciones / consumoDiario);
}

// La autonomía real la marca el recurso que antes se acaba.
const calcularAutonomia = (diasAgua: number, diasComida: number): number =>
    diasAgua < diasComida ? diasAgua : diasComida;

console.log("=== CALCULADORA DE SUPERVIVENCIA ===");

// Datos actuales del refugio para hacer las pruebas.
const numeroSupervivientes: number = 6;
const aguaDisponible: number = 97.5;
const racionesDisponibles: number = 67;

const diasAgua = calcularDiasConAgua(numeroSupervivientes, aguaDisponible);
const diasComida = calcularDiasConComida(
    numeroSupervivientes,
    racionesDisponibles,
);
const autonomia = calcularAutonomia(diasAgua, diasComida);

console.log(`Con ${numeroSupervivientes} supervivientes en el refugio:`);
console.log(`- El agua da para ${diasAgua} días.`);
console.log(`- La comida da para ${diasComida} días.`);
console.log(`- Autonomía real: ${autonomia} días.`);

// Caso extremo: nadie en el refugio.
console.log(`Sin supervivientes: ${calcularDiasConAgua(0, 50)} días.`);
