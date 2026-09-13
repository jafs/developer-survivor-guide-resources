// Ejercicio 21.1: Días de comida.
// Se ejecuta con: deno test block04/exercise21.1.ts

import { test } from "node:test";
import assert from "node:assert/strict";

const RACIONES_POR_PERSONA_DIA = 3;

// Versión arreglada. La original dividía entre 0 cuando no había nadie:
// return Math.floor(raciones / (personas * 3));
function diasDeComida(raciones: number, personas: number): number {
    // Bonus: los datos negativos son un error de quien los apunta.
    if (raciones < 0 || personas < 0) {
        throw new Error(`Datos imposibles: ${raciones} raciones, ` +
            `${personas} personas`);
    }
    if (personas === 0) {
        return 0;
    }
    return Math.floor(raciones / (personas * RACIONES_POR_PERSONA_DIA));
}

test("con 60 raciones, 5 personas comen 4 días", () => {
    assert.equal(diasDeComida(60, 5), 4);
});

test("si las raciones no llegan a un día completo, son 0 días", () => {
    assert.equal(diasDeComida(14, 5), 0);
});

test("sin raciones no hay días de comida", () => {
    assert.equal(diasDeComida(0, 5), 0);
});

test("sin personas en la cárcel, la función devuelve 0", () => {
    assert.equal(diasDeComida(60, 0), 0);
});

test("las raciones negativas lanzan un error", () => {
    assert.throws(() => diasDeComida(-10, 5), /Datos imposibles/);
});

test("las personas negativas lanzan un error", () => {
    assert.throws(() => diasDeComida(60, -2), /Datos imposibles/);
});
