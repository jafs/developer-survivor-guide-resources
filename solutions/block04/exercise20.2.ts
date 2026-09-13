// Ejercicio 20.2: Tres equipos al polígono.

function explorarNave(
    equipo: string,
    milisegundos: number,
    cajas: number | null,
): Promise<number> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (cajas === null) {
                reject(new Error(`El equipo de ${equipo} ha tenido que huir`));
                return;
            }
            console.log(`Vuelve el equipo de ${equipo} con ${cajas} cajas`);
            resolve(cajas);
        }, milisegundos);
    });
}

function conTiempoMaximo(
    promesa: Promise<number>,
    milisegundos: number,
): Promise<number> {
    const limite = new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            reject(new Error(`Tiempo agotado tras ${milisegundos} ms`));
        }, milisegundos);
    });
    return Promise.race([promesa, limite]);
}

function mostrarMotivo(error: unknown): string {
    return error instanceof Error ? error.message : "desconocido";
}

console.log("=== LOS TRES EQUIPOS VUELVEN ===");
const cajasPorEquipo = await Promise.all([
    explorarNave("Amaia", 300, 5),
    explorarNave("Marcos", 400, 7),
    explorarNave("Ana", 200, 2),
]);
let totalCajas = 0;
for (const cajas of cajasPorEquipo) {
    totalCajas += cajas;
}
console.log(`Total: ${totalCajas} cajas`);

console.log("\n=== UN EQUIPO TIENE QUE HUIR ===");
const equipos = ["Amaia", "Marcos", "Ana"];
const resultados = await Promise.allSettled([
    explorarNave("Amaia", 300, 5),
    explorarNave("Marcos", 400, null),
    explorarNave("Ana", 200, 2),
]);

let cajasRecuperadas = 0;
const hanHuido: string[] = [];
resultados.forEach((resultado, indice) => {
    if (resultado.status === "fulfilled") {
        cajasRecuperadas += resultado.value;
    } else {
        hanHuido.push(equipos[indice]);
    }
});
console.log(`Cajas recuperadas: ${cajasRecuperadas}`);
console.log(`Han tenido que huir: ${hanHuido.join(", ")}`);

console.log("\n=== EQUIPO LENTO CON TIEMPO MÁXIMO ===");
try {
    const cajas = await conTiempoMaximo(explorarNave("Diego", 700, 3), 500);
    console.log(`Diego vuelve a tiempo con ${cajas} cajas`);
} catch (error) {
    console.log(`${mostrarMotivo(error)}: salen a buscar a Diego`);
}

// Bonus: con Promise.all, el primer rechazo se lleva todo lo demás.
console.log("\n=== BONUS: PROMISE.ALL CON UN EQUIPO QUE HUYE ===");
try {
    await Promise.all([
        explorarNave("Amaia", 300, 5),
        explorarNave("Marcos", 100, null),
        explorarNave("Ana", 200, 2),
    ]);
} catch (error) {
    console.log(`Promise.all se rechaza: ${mostrarMotivo(error)}`);
    console.log("No sabemos cuántas cajas han traído Amaia y Ana");
}
