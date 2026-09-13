// Ejercicio 9.2: Balance de expediciones.

// Litros de agua traídos por cada expedición, en orden.
const litrosPorExpedicion: number[] = [
    12, 0, 7, 25, 3, 0, 18, 31, 9, 0, 14, 22,
];

console.log("=== BALANCE DE EXPEDICIONES ===");

const sinAgua = litrosPorExpedicion.filter((litros) => litros === 0).length;
console.log(`Expediciones sin agua: ${sinAgua}`);

const totalLitros = litrosPorExpedicion.reduce(
    (total, litros) => total + litros,
    0,
);
console.log(`Total de litros: ${totalLitros}`);

const garrafas = litrosPorExpedicion.map((litros) => Math.floor(litros / 5));
console.log(`Garrafas de 5 litros: ${garrafas.join(", ")}`);

const primeraGrande = litrosPorExpedicion.find((litros) => litros > 20);
const posicionGrande = litrosPorExpedicion.findIndex((litros) => litros > 20);
if (primeraGrande === undefined) {
    console.log("Ninguna expedición trajo más de 20 litros.");
} else {
    console.log(
        `Primera de más de 20 litros: ${primeraGrande} ` +
        `(posición ${posicionGrande})`
    );
}

const algunaMuyBuena = litrosPorExpedicion.some((litros) => litros > 30);
const todasTrajeron = litrosPorExpedicion.every((litros) => litros > 0);
console.log(`Alguna trajo más de 30 litros: ${algunaMuyBuena}`);
console.log(`Todas trajeron agua: ${todasTrajeron}`);

// toSorted() devuelve una copia, así que el original no cambia.
const mejores = litrosPorExpedicion
    .toSorted((primera, segunda) => segunda - primera)
    .slice(0, 5);
console.log(`Las cinco mejores: ${mejores.join(", ")}`);

const sumaConAgua = litrosPorExpedicion
    .filter((litros) => litros > 0)
    .reduce((total, litros) => total + litros, 0);
const mediaConAgua = sumaConAgua / (litrosPorExpedicion.length - sinAgua);
console.log(`Media con agua: ${mediaConAgua.toFixed(1)} litros`);
