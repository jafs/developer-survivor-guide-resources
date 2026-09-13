// Ejercicio 21.2: Simulacro de los ejercicios anteriores.
// Se ejecuta con: deno test block04/exercise21.2.ts

import { test } from "node:test";
import assert from "node:assert/strict";

// === DEL EJERCICIO 19.1 ===

function repartirGasoleo(litros: number, generadores: number): number {
    if (litros < 0) {
        throw new Error(`Los litros no pueden ser negativos: ${litros}`);
    }
    if (!Number.isInteger(generadores) || generadores <= 0) {
        throw new Error(
            `Los generadores deben ser un entero mayor que 0: ${generadores}`
        );
    }
    return litros / generadores;
}

// === DEL EJERCICIO 20.1 ===

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

// === TESTS DEL REPARTO ===

test("120 litros entre 4 generadores son 30 para cada uno", () => {
    assert.equal(repartirGasoleo(120, 4), 30);
});

test("repartir 0 litros da 0 a cada generador", () => {
    assert.equal(repartirGasoleo(0, 2), 0);
});

test("los litros negativos se rechazan", () => {
    assert.throws(() => repartirGasoleo(-20, 3), /negativos/);
});

test("0 generadores se rechazan", () => {
    assert.throws(() => repartirGasoleo(50, 0), /entero mayor que 0/);
});

test("2,5 generadores se rechazan", () => {
    assert.throws(() => repartirGasoleo(60, 2.5), /entero mayor que 0/);
});

// === TESTS DE LA RONDA ===

test("un tramo sin huellas no tiene novedad", async () => {
    const parte = await revisarTramo("muro sur", 50, false);
    assert.equal(parte, "Tramo muro sur sin novedad");
});

test("un tramo con huellas se rechaza", async () => {
    // Bonus: sin este await, el test termina antes de que la promesa se
    // rechace. Si el texto buscado no aparece, este test pasa igualmente y
    // el fallo sale después: Deno se lo atribuye a otro test y Node.js, al
    // archivo.
    await assert.rejects(
        revisarTramo("muro norte", 50, true),
        /Huellas recientes en el tramo muro norte/,
    );
});
