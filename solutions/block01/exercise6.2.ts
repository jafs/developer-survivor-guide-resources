// Ejercicio 6.2: Inventario semanal.

// Inventario semanal: raciones que necesitas cada día.
const CONSUMO_DIARIO: number = 4;
let diasCriticos: number = 0;
let totalConsumido: number = 0;

console.log("=== INVENTARIO SEMANAL ===");

for (let dia = 1; dia <= 7; dia++) {
    // En el capítulo 8 verás cómo funciona esta fórmula.
    let racionesEncontradas: number = Math.floor(Math.random() * 10);
    let esCritico: boolean = racionesEncontradas < CONSUMO_DIARIO;

    if (esCritico) {
        // Te comes lo que haya.
        diasCriticos++;
        totalConsumido += racionesEncontradas;
    } else {
        totalConsumido += CONSUMO_DIARIO;
    }

    console.log(`Día ${dia}: ${racionesEncontradas} raciones encontradas.`);
    console.log(`  Día crítico: ${esCritico}`);
}

console.log(`\n=== RESUMEN SEMANAL ===`);
console.log(`Días críticos: ${diasCriticos}/7`);
console.log(`Total raciones consumidas: ${totalConsumido} raciones`);

if (diasCriticos > 2) {
    console.log("Estás en riesgo: busca un refugio con más recursos.");
}
