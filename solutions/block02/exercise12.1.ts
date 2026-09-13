// Ejercicio 12.1: Inventario de herramientas personales.

type EstadoHerramienta = "operativa" | "desgastada" | "rota";

type Herramienta = {
    readonly tipo: string;
    durabilidad: number;
    peso: number;
    asignada: string;
    estado: EstadoHerramienta;
    notas?: string;
};

const cuchilla: Herramienta = {
    tipo: "cuchilla de supervivencia",
    durabilidad: 85,
    peso: 0.3,
    asignada: "Ana",
    estado: "operativa",
    notas: "Afilada ayer",
};

const radio: Herramienta = {
    tipo: "radio portátil",
    durabilidad: 60,
    peso: 1.2,
    asignada: "Diego",
    estado: "operativa",
};

const mochila: Herramienta = {
    tipo: "mochila táctica",
    durabilidad: 25,
    peso: 2.5,
    asignada: "Julia",
    estado: "desgastada",
};

function evaluarHerramienta(herramienta: Herramienta): void {
    const { tipo, durabilidad, peso, asignada, estado, notas } = herramienta;
    console.log(`${tipo} (${asignada})`);
    console.log(`  Durabilidad: ${durabilidad} - Estado: ${estado}`);
    console.log(`  Peso: ${peso} kg`);
    console.log(`  Notas: ${notas ?? "Sin notas"}`);
}

// Devuelve una copia desgastada: la herramienta original no cambia.
function usarHerramienta(
    herramienta: Herramienta,
    desgaste: number,
): Herramienta {
    const nuevaDurabilidad = Math.max(0, herramienta.durabilidad - desgaste);

    let nuevoEstado: EstadoHerramienta = "operativa";
    if (nuevaDurabilidad === 0) {
        nuevoEstado = "rota";
    } else if (nuevaDurabilidad < 30) {
        nuevoEstado = "desgastada";
    }

    return {
        ...herramienta,
        durabilidad: nuevaDurabilidad,
        estado: nuevoEstado,
    };
}

console.log("=== INVENTARIO DE HERRAMIENTAS PERSONALES ===");
console.log("Registro de equipamiento del refugio");

evaluarHerramienta(cuchilla);
evaluarHerramienta(radio);
evaluarHerramienta(mochila);

const radioUsada = usarHerramienta(radio, 75);

console.log("\nRadio después de un uso intenso:");
evaluarHerramienta(radioUsada);
console.log("\nLa radio original sigue igual:");
evaluarHerramienta(radio);
