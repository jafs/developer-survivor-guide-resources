// Ejecutor de soluciones de la Guía de Programación en un Apocalipsis Zombi.
//
// Uso:
//   npm start                Modo interactivo.
//   npm start -- 7.1         Ejecuta la solución del ejercicio 7.1.
//   npm start -- desafio2    Ejecuta la solución del desafío 2.

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createInterface } from "node:readline";

const CARPETA_SOLUCIONES = import.meta.dirname;

// Carpetas de bloque ordenadas: block01, block02...
function listarBloques(): string[] {
    return readdirSync(CARPETA_SOLUCIONES)
        .filter((nombre) => /^block\d+$/.test(nombre))
        .sort();
}

// Busca un fichero de solución en todas las carpetas de bloque.
function buscarSolucion(fichero: string): string | undefined {
    for (const bloque of listarBloques()) {
        const ruta = join(CARPETA_SOLUCIONES, bloque, fichero);
        if (existsSync(ruta)) {
            return ruta;
        }
    }
    return undefined;
}

// Ordena "7.1", "10.2"... por capítulo y después por ejercicio.
function compararEjercicios(primero: string, segundo: string): number {
    const [capituloA, ejercicioA] = primero.split(".").map(Number);
    const [capituloB, ejercicioB] = segundo.split(".").map(Number);
    return capituloA - capituloB || ejercicioA - ejercicioB;
}

function mostrarLista(): void {
    console.log("\nSoluciones disponibles:");
    for (const bloque of listarBloques()) {
        const ficheros = readdirSync(join(CARPETA_SOLUCIONES, bloque));
        const ejercicios = ficheros
            .filter((fichero) => /^exercise\d+\.\d+\.ts$/.test(fichero))
            .map((fichero) =>
                fichero.replace("exercise", "").replace(".ts", ""),
            )
            .sort(compararEjercicios);
        const desafios = ficheros
            .filter((fichero) => /^challenge\d+\.ts$/.test(fichero))
            .map((fichero) =>
                fichero.replace("challenge", "desafio").replace(".ts", ""),
            );

        console.log(`\n${bloque}`);
        console.log(`  Ejercicios: ${ejercicios.join(", ")}`);
        console.log(`  Desafío: ${desafios.join(", ")}`);
    }
}

// Traduce lo que se escribe («7.1», «desafio2») al fichero de solución.
function obtenerFichero(orden: string): string | undefined {
    const ejercicio = orden.match(/^(\d+\.\d+)$/);
    if (ejercicio !== null) {
        return `exercise${ejercicio[1]}.ts`;
    }
    const desafio = orden.match(/^desaf[ií]o\s*(\d+)$/);
    if (desafio !== null) {
        return `challenge${desafio[1]}.ts`;
    }
    return undefined;
}

function ejecutar(orden: string): void {
    const fichero = obtenerFichero(orden);
    if (fichero === undefined) {
        console.log(`No entiendo "${orden}". Prueba con 7.1 o desafio2.`);
        return;
    }

    const ruta = buscarSolucion(fichero);
    if (ruta === undefined) {
        console.log(`No hay ninguna solución para "${orden}".`);
        return;
    }

    console.log(`\n--- ${fichero} ---`);
    // Node carga tsx para ejecutar TypeScript, también las soluciones con enum.
    spawnSync(process.execPath, ["--import", "tsx", ruta], {
        stdio: "inherit",
    });
    console.log(`--- Fin de ${fichero} ---`);
}

async function modoInteractivo(): Promise<void> {
    console.log("Ejecutor de soluciones");
    console.log("Guía de Programación en un Apocalipsis Zombi");
    console.log("Escribe 7.1 para un ejercicio, desafio2 para un desafío,");
    console.log("lista para ver todas las soluciones o salir para terminar.");

    const consola = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "\n> ",
    });

    consola.prompt();
    // El bucle recibe cada línea que se escribe, sin perder ninguna.
    for await (const linea of consola) {
        const orden = linea.trim().toLowerCase();
        if (orden === "salir") {
            break;
        }
        if (orden === "lista") {
            mostrarLista();
        } else if (orden !== "") {
            ejecutar(orden);
        }
        consola.prompt();
    }
    consola.close();
}

const argumento = process.argv[2];
if (argumento === undefined) {
    await modoInteractivo();
} else {
    ejecutar(argumento.toLowerCase());
}
