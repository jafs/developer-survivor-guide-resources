// Ejercicio 20.1: Ronda nocturna.

type Tramo = [string, number, boolean];

function revisarTramo(
    tramo: string,
    milisegundos: number,
    hayHuellas: boolean,
): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (hayHuellas) {
                reject(new Error(`Huellas recientes en el tramo ${tramo}`));
                return;
            }
            resolve(`Tramo ${tramo} sin novedad`);
        }, milisegundos);
    });
}

async function rondaNocturna(tramos: Tramo[]): Promise<void> {
    const inicio = Date.now();
    try {
        for (const [tramo, milisegundos, hayHuellas] of tramos) {
            const parte = await revisarTramo(tramo, milisegundos, hayHuellas);
            console.log(parte);
        }
        console.log("Ronda completa");
    } catch (error) {
        const motivo = error instanceof Error ? error.message : "desconocido";
        console.log(`ALERTA: ${motivo}. Se corta la ronda`);
    } finally {
        const duracion = Math.round((Date.now() - inicio) / 100) * 100;
        console.log(`La ronda ha durado unos ${duracion} ms`);
    }
}

console.log("=== TRAMO DEL PATIO ===");
await revisarTramo("patio", 200, false)
    .then((parte) => console.log(parte))
    .catch((error) => console.log(`ALERTA: ${error.message}`));

console.log("\n=== RONDA CON HUELLAS ===");
const tramosDeEstaNoche: Tramo[] = [
    ["muro sur", 300, false],
    ["muro este", 200, false],
    ["muro norte", 400, true],
    ["muro oeste", 300, false],
];
await rondaNocturna(tramosDeEstaNoche);

console.log("\n=== RONDA TRANQUILA ===");
await rondaNocturna([
    ["muro sur", 200, false],
    ["muro oeste", 300, false],
]);
