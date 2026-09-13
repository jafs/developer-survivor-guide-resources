// Ejercicio 21.3: La nevera de la enfermería.
// Se ejecuta con: deno test block04/exercise21.3.ts

import { test } from "node:test";
import assert from "node:assert/strict";

// === CONTROL DE LA NEVERA ===

interface Termometro {
    leerGrados(): Promise<number>;
}

class TermometroAveriadoError extends Error {
    public readonly lectura: number;

    public constructor(lectura: number) {
        super(`Lectura imposible del termómetro: ${lectura} °C`);
        this.name = "TermometroAveriadoError";
        this.lectura = lectura;
    }
}

const GRADOS_MINIMOS = 2;
const GRADOS_MAXIMOS = 8;

class ControlNevera {
    private termometro: Termometro;

    public constructor(termometro: Termometro) {
        this.termometro = termometro;
    }

    public async revisar(): Promise<string> {
        const grados = await this.termometro.leerGrados();
        if (grados < -60 || grados > 80) {
            throw new TermometroAveriadoError(grados);
        }
        if (grados < GRADOS_MINIMOS) {
            return "demasiado fría";
        }
        if (grados > GRADOS_MAXIMOS) {
            return "demasiado caliente";
        }
        return "correcta";
    }
}

// === DOBLE DE PRUEBA ===

class TermometroFalso implements Termometro {
    private grados: number;
    private lecturas: number = 0;

    public constructor(grados: number) {
        this.grados = grados;
    }

    // Bonus: cuántas veces se ha leído el termómetro.
    public get vecesLeido(): number {
        return this.lecturas;
    }

    public async leerGrados(): Promise<number> {
        this.lecturas++;
        return this.grados;
    }
}

function controlCon(grados: number): ControlNevera {
    return new ControlNevera(new TermometroFalso(grados));
}

// === TESTS ===

test("a 5 °C la nevera está correcta", async () => {
    assert.equal(await controlCon(5).revisar(), "correcta");
});

test("a 1 °C la nevera está demasiado fría", async () => {
    assert.equal(await controlCon(1).revisar(), "demasiado fría");
});

test("a 9 °C la nevera está demasiado caliente", async () => {
    assert.equal(await controlCon(9).revisar(), "demasiado caliente");
});

test("los límites de 2 y 8 °C están incluidos", async () => {
    assert.equal(await controlCon(2).revisar(), "correcta");
    assert.equal(await controlCon(8).revisar(), "correcta");
});

test("justo fuera de los límites ya no está correcta", async () => {
    assert.equal(await controlCon(1.9).revisar(), "demasiado fría");
    assert.equal(await controlCon(8.1).revisar(), "demasiado caliente");
});

test("una lectura de -900 °C indica un termómetro averiado", async () => {
    await assert.rejects(controlCon(-900).revisar(), TermometroAveriadoError);
});

test("revisar lee el termómetro una sola vez", async () => {
    const termometro = new TermometroFalso(4);
    await new ControlNevera(termometro).revisar();
    assert.equal(termometro.vecesLeido, 1);
});
