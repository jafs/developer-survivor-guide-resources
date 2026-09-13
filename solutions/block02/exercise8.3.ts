// Ejercicio 8.3: Administrador de recursos del refugio.

const LITROS_AGUA_POR_PERSONA_DIA: number = 2.5;
const KILOS_COMIDA_POR_PERSONA_DIA: number = 1;

let aguaLitros: number = 96;
const comidaKilos: number = 43.8;
const supervivientes: number = 6;

const consumoAguaDiario = supervivientes * LITROS_AGUA_POR_PERSONA_DIA;
const consumoComidaDiario = supervivientes * KILOS_COMIDA_POR_PERSONA_DIA;

// La autonomía la marca el recurso que antes se acaba.
function calcularAutonomia(agua: number): number {
    const diasAgua = Math.floor(agua / consumoAguaDiario);
    const diasComida = Math.floor(comidaKilos / consumoComidaDiario);
    return Math.min(diasAgua, diasComida);
}

function clasificarAutonomia(dias: number): string {
    if (dias >= 7) {
        return "Estado óptimo";
    }
    if (dias >= 3) {
        return "Precaución - Planear expedición";
    }
    return "¡CRÍTICO! Expedición urgente";
}

console.log("=== ESTADO DEL REFUGIO ===");
console.log(`Analizando recursos para ${supervivientes} supervivientes...`);
console.log(`Agua: ${aguaLitros.toLocaleString("es-ES")} litros`);
console.log(`Comida: ${comidaKilos.toLocaleString("es-ES")} kilos`);
console.log(
    `Consumo diario: ${consumoAguaDiario.toFixed(1)} litros y ` +
    `${consumoComidaDiario.toFixed(1)} kilos`
);

let autonomia = calcularAutonomia(aguaLitros);
console.log(`Autonomía: ${autonomia} días. ${clasificarAutonomia(autonomia)}`);

// Esta noche llueve: los bidones recogen entre 0 y 10 litros.
const litrosLluvia = Math.floor(Math.random() * 11);
aguaLitros += litrosLluvia;
autonomia = calcularAutonomia(aguaLitros);

console.log(`\nLa lluvia deja ${litrosLluvia} litros en los bidones.`);
console.log(`Agua: ${aguaLitros.toLocaleString("es-ES")} litros`);
console.log(`Autonomía: ${autonomia} días. ${clasificarAutonomia(autonomia)}`);
