// Desafío 2: Sistema de gestión de refugios.

// === CONFIGURACIÓN INICIAL ===

enum TipoRecurso {
    AGUA = "agua",
    COMIDA = "comida",
    MEDICINAS = "medicinas",
    COMBUSTIBLE = "combustible",
}

enum EstadoRefugio {
    SEGURO = "seguro",
    ALERTA = "alerta",
    COMPROMETIDO = "comprometido",
    EVACUANDO = "evacuando",
}

enum NivelHabilidad {
    BASICO = 1,
    COMPETENTE = 2,
    AVANZADO = 3,
    ELITE = 4,
}

enum TipoMision {
    RECONOCIMIENTO = "reconocimiento",
    RESCATE = "rescate",
    SUMINISTROS = "suministros",
}

type EstadoSuperviviente = "disponible" | "en_mision" | "herido";

type Refugio = {
    readonly ubicacion: readonly [number, number]; // [latitud, longitud]
    estado: EstadoRefugio;
    capacidadMaxima: number;
    supervivientesActuales: number;
};

type Superviviente = {
    refugioActual: string;
    habilidades: Record<string, NivelHabilidad>;
    estado: EstadoSuperviviente;
};

type Mision = {
    tipo: TipoMision;
    refugioOrigen: string;
    supervivientesAsignados: string[];
    prioridad: number; // De 1 a 5: 5 es la más urgente.
    descripcion: string;
};

// === DATOS INICIALES ===

const refugios: Record<string, Refugio> = {
    "Refugio Norte": {
        ubicacion: [41.2, -75.1],
        estado: EstadoRefugio.SEGURO,
        capacidadMaxima: 15,
        supervivientesActuales: 12,
    },
    "Refugio Sur": {
        ubicacion: [40.8, -74.9],
        estado: EstadoRefugio.ALERTA,
        capacidadMaxima: 20,
        supervivientesActuales: 8,
    },
    "Refugio Central": {
        ubicacion: [41.0, -75.0],
        estado: EstadoRefugio.SEGURO,
        capacidadMaxima: 30,
        supervivientesActuales: 18,
    },
};

const inventarioRefugios = new Map<string, Map<TipoRecurso, number>>([
    ["Refugio Norte", new Map([
        [TipoRecurso.AGUA, 45],
        [TipoRecurso.COMIDA, 23],
        [TipoRecurso.MEDICINAS, 8],
        [TipoRecurso.COMBUSTIBLE, 12],
    ])],
    ["Refugio Sur", new Map([
        [TipoRecurso.AGUA, 28],
        [TipoRecurso.COMIDA, 41],
        [TipoRecurso.MEDICINAS, 15],
        [TipoRecurso.COMBUSTIBLE, 8],
    ])],
    ["Refugio Central", new Map([
        [TipoRecurso.AGUA, 67],
        [TipoRecurso.COMIDA, 89],
        [TipoRecurso.MEDICINAS, 34],
        [TipoRecurso.COMBUSTIBLE, 23],
    ])],
]);

// Supervivientes registrados, con sus habilidades.
const supervivientes = new Map<string, Superviviente>([
    ["Ana", {
        refugioActual: "Refugio Norte",
        habilidades: {
            exploracion: NivelHabilidad.AVANZADO,
            vigilancia: NivelHabilidad.COMPETENTE,
        },
        estado: "disponible",
    }],
    ["Marcos", {
        refugioActual: "Refugio Norte",
        habilidades: {
            exploracion: NivelHabilidad.ELITE,
            sigilo: NivelHabilidad.AVANZADO,
        },
        estado: "disponible",
    }],
    ["Diego", {
        refugioActual: "Refugio Sur",
        habilidades: {
            ingenieria: NivelHabilidad.ELITE,
            logistica: NivelHabilidad.COMPETENTE,
        },
        estado: "disponible",
    }],
    ["Julia", {
        refugioActual: "Refugio Central",
        habilidades: {
            medicina: NivelHabilidad.ELITE,
            logistica: NivelHabilidad.AVANZADO,
        },
        estado: "en_mision",
    }],
]);

// Misiones activas, por código.
const misionesActivas = new Map<string, Mision>();

// === CONSTANTES DE LA SOLUCIÓN ===

const TODOS_LOS_RECURSOS: TipoRecurso[] = [
    TipoRecurso.AGUA,
    TipoRecurso.COMIDA,
    TipoRecurso.MEDICINAS,
    TipoRecurso.COMBUSTIBLE,
];

const RECURSOS_ESENCIALES: TipoRecurso[] = [
    TipoRecurso.AGUA,
    TipoRecurso.COMIDA,
    TipoRecurso.MEDICINAS,
];

const UMBRAL_ESCASEZ: number = 10;

// === PARTE 1: ANÁLISIS DE RECURSOS ===

function calcularRecursoTotal(tipo: TipoRecurso): number {
    let total = 0;
    for (const inventario of inventarioRefugios.values()) {
        total += inventario.get(tipo) ?? 0;
    }
    return total;
}

function identificarEscasezCritica(): string[] {
    const enCrisis: string[] = [];
    for (const [nombre, inventario] of inventarioRefugios) {
        const hayEscasez = RECURSOS_ESENCIALES.some(
            (recurso) => (inventario.get(recurso) ?? 0) < UMBRAL_ESCASEZ,
        );
        if (hayEscasez) {
            enCrisis.push(nombre);
        }
    }
    return enCrisis;
}

function sumarInventario(inventario: Map<TipoRecurso, number>): number {
    let total = 0;
    for (const cantidad of inventario.values()) {
        total += cantidad;
    }
    return total;
}

function encontrarRefugioMasAbastecido(): string {
    let maximo = -1;
    let masAbastecidos: string[] = [];

    for (const [nombre, inventario] of inventarioRefugios) {
        const total = sumarInventario(inventario);
        if (total > maximo) {
            maximo = total;
            masAbastecidos = [nombre];
        } else if (total === maximo) {
            masAbastecidos.push(nombre);
        }
    }
    return masAbastecidos.join(", ");
}

// === PARTE 2: SUPERVIVIENTES Y MISIONES ===

function buscarEspecialistas(
    habilidad: string,
    nivelMinimo: NivelHabilidad,
): string[] {
    const encontrados: string[] = [];
    for (const [nombre, superviviente] of supervivientes) {
        const tieneNivel = habilidad in superviviente.habilidades &&
            superviviente.habilidades[habilidad] >= nivelMinimo;
        if (superviviente.estado === "disponible" && tieneNivel) {
            encontrados.push(nombre);
        }
    }
    return encontrados;
}

function asignarMision(codigo: string, mision: Mision): boolean {
    const asignados = mision.supervivientesAsignados;
    if (misionesActivas.has(codigo) || asignados.length === 0) {
        return false;
    }

    // Primero se comprueba a todo el equipo, para no dejar cambios a medias.
    const todosPueden = asignados.every((nombre) => {
        const superviviente = supervivientes.get(nombre);
        return superviviente !== undefined &&
            superviviente.estado === "disponible" &&
            superviviente.refugioActual === mision.refugioOrigen;
    });
    if (!todosPueden) {
        return false;
    }

    misionesActivas.set(codigo, mision);
    for (const nombre of asignados) {
        const superviviente = supervivientes.get(nombre);
        if (superviviente !== undefined) {
            superviviente.estado = "en_mision";
        }
    }
    return true;
}

function completarMision(
    codigo: string,
    recursosObtenidos: Map<TipoRecurso, number>,
): boolean {
    const mision = misionesActivas.get(codigo);
    if (mision === undefined) {
        return false;
    }

    const inventario = inventarioRefugios.get(mision.refugioOrigen);
    if (inventario !== undefined) {
        for (const [recurso, cantidad] of recursosObtenidos) {
            inventario.set(recurso, (inventario.get(recurso) ?? 0) + cantidad);
        }
    }

    for (const nombre of mision.supervivientesAsignados) {
        const superviviente = supervivientes.get(nombre);
        if (superviviente !== undefined) {
            superviviente.estado = "disponible";
        }
    }

    misionesActivas.delete(codigo);
    return true;
}

// === PARTE 3: ALERTAS E INFORME ===

function evaluarAmenaza(
    zombisDetectados: number,
    distanciaKm: number,
): EstadoRefugio {
    const puntosZombis = Math.floor(zombisDetectados / 5);
    const puntosDistancia = Math.max(0, 5 - Math.floor(distanciaKm));
    const puntos = puntosZombis + puntosDistancia;

    if (puntos > 8) {
        return EstadoRefugio.EVACUANDO;
    }
    if (puntos >= 6) {
        return EstadoRefugio.COMPROMETIDO;
    }
    if (puntos >= 3) {
        return EstadoRefugio.ALERTA;
    }
    return EstadoRefugio.SEGURO;
}

function transferirRecursosEmergencia(
    origen: string,
    destino: string,
    porcentaje: number,
): boolean {
    const inventarioOrigen = inventarioRefugios.get(origen);
    const inventarioDestino = inventarioRefugios.get(destino);

    if (
        !(origen in refugios) ||
        inventarioOrigen === undefined ||
        inventarioDestino === undefined ||
        origen === destino ||
        porcentaje < 1 ||
        porcentaje > 100 ||
        refugios[origen].estado === EstadoRefugio.SEGURO
    ) {
        return false;
    }

    for (const [recurso, cantidad] of inventarioOrigen) {
        const enviada = Math.floor((cantidad * porcentaje) / 100);
        const enDestino = inventarioDestino.get(recurso) ?? 0;
        inventarioOrigen.set(recurso, cantidad - enviada);
        inventarioDestino.set(recurso, enDestino + enviada);
    }
    return true;
}

function generarInforme(): string {
    let informe = "=== INFORME DE LA RED DE REFUGIOS ===\n";

    informe += "\nRefugios:\n";
    for (const [nombre, refugio] of Object.entries(refugios)) {
        const ocupacion =
            `${refugio.supervivientesActuales}/${refugio.capacidadMaxima}`;
        informe += `- ${nombre}: ${refugio.estado}, ${ocupacion} personas\n`;
    }

    informe += "\nRecursos totales:\n";
    for (const recurso of TODOS_LOS_RECURSOS) {
        informe += `- ${recurso}: ${calcularRecursoTotal(recurso)}\n`;
    }

    const porEstado = new Map<EstadoSuperviviente, number>();
    for (const superviviente of supervivientes.values()) {
        const cantidad = porEstado.get(superviviente.estado) ?? 0;
        porEstado.set(superviviente.estado, cantidad + 1);
    }
    informe += "\nSupervivientes por estado:\n";
    for (const [estado, cantidad] of porEstado) {
        informe += `- ${estado}: ${cantidad}\n`;
    }

    // Cada elemento es un par [código, misión].
    const misionesOrdenadas = Array.from(misionesActivas).toSorted(
        (primera, segunda) => segunda[1].prioridad - primera[1].prioridad,
    );
    informe += "\nMisiones activas:\n";
    if (misionesOrdenadas.length === 0) {
        informe += "- Ninguna\n";
    }
    for (const [codigo, mision] of misionesOrdenadas) {
        informe += `- ${codigo} (prioridad ${mision.prioridad}): ` +
            `${mision.descripcion}\n`;
    }

    const enCrisis = identificarEscasezCritica();
    const textoCrisis = enCrisis.length === 0 ? "ninguna" : enCrisis.join(", ");
    informe += `\nEscasez crítica: ${textoCrisis}`;

    return informe;
}

// === BONUS ===

function iniciarEvacuacion(origen: string, destino: string): boolean {
    if (!(origen in refugios) || !(destino in refugios) || origen === destino) {
        return false;
    }

    const refugioOrigen = refugios[origen];
    const refugioDestino = refugios[destino];
    const personas = refugioOrigen.supervivientesActuales;
    const plazasLibres =
        refugioDestino.capacidadMaxima - refugioDestino.supervivientesActuales;

    // No se evacua hacia un refugio que también se está evacuando.
    if (
        refugioDestino.estado === EstadoRefugio.EVACUANDO ||
        plazasLibres < personas
    ) {
        return false;
    }

    refugioDestino.supervivientesActuales += personas;
    refugioOrigen.supervivientesActuales = 0;
    refugioOrigen.estado = EstadoRefugio.EVACUANDO;

    for (const superviviente of supervivientes.values()) {
        if (superviviente.refugioActual === origen) {
            superviviente.refugioActual = destino;
        }
    }

    const inventarioOrigen = inventarioRefugios.get(origen);
    const inventarioDestino = inventarioRefugios.get(destino);
    if (inventarioOrigen !== undefined && inventarioDestino !== undefined) {
        for (const [recurso, cantidad] of inventarioOrigen) {
            const enDestino = inventarioDestino.get(recurso) ?? 0;
            inventarioDestino.set(recurso, enDestino + cantidad);
            inventarioOrigen.set(recurso, 0);
        }
    }
    return true;
}

function recomendarTransferencias(): string[] {
    const recomendaciones: string[] = [];

    for (const recurso of TODOS_LOS_RECURSOS) {
        const media = calcularRecursoTotal(recurso) / inventarioRefugios.size;

        // Refugio que más tiene de este recurso.
        let refugioMasRico = "";
        let cantidadMaxima = -1;
        for (const [nombre, inventario] of inventarioRefugios) {
            const cantidad = inventario.get(recurso) ?? 0;
            if (cantidad > cantidadMaxima) {
                cantidadMaxima = cantidad;
                refugioMasRico = nombre;
            }
        }

        for (const [nombre, inventario] of inventarioRefugios) {
            const cantidad = inventario.get(recurso) ?? 0;
            if (nombre !== refugioMasRico && cantidad < media / 2) {
                recomendaciones.push(
                    `Enviar ${recurso} de ${refugioMasRico} a ${nombre} ` +
                    `(tiene ${cantidad} y la media es ${media.toFixed(1)})`,
                );
            }
        }
    }
    return recomendaciones;
}

// === PRUEBAS ===

console.log("=== PRUEBAS DEL SISTEMA DE GESTIÓN DE REFUGIOS ===");

// Parte 1: análisis de recursos.
console.log("\n--- Análisis de recursos ---");
console.log(`Agua en la red: ${calcularRecursoTotal(TipoRecurso.AGUA)} litros`);
console.log(`Escasez crítica: ${identificarEscasezCritica().join(", ")}`);
console.log(`Más abastecido: ${encontrarRefugioMasAbastecido()}`);

// Parte 2: supervivientes y misiones.
console.log("\n--- Supervivientes y misiones ---");
const exploradores = buscarEspecialistas(
    "exploracion",
    NivelHabilidad.AVANZADO,
);
console.log(`Exploración disponible: ${exploradores.join(", ")}`);

const reconocimiento = asignarMision("MIS-001", {
    tipo: TipoMision.RECONOCIMIENTO,
    refugioOrigen: "Refugio Norte",
    supervivientesAsignados: ["Ana", "Marcos"],
    prioridad: 3,
    descripcion: "Explorar la zona industrial abandonada",
});
console.log(`MIS-001 asignada: ${reconocimiento}`);

// Ana ya está en una misión y además no está en el Refugio Sur.
const suministros = asignarMision("MIS-002", {
    tipo: TipoMision.SUMINISTROS,
    refugioOrigen: "Refugio Sur",
    supervivientesAsignados: ["Diego", "Ana"],
    prioridad: 4,
    descripcion: "Recoger bidones en la gasolinera",
});
console.log(`MIS-002 asignada: ${suministros}`);

const rescate = asignarMision("MIS-003", {
    tipo: TipoMision.RESCATE,
    refugioOrigen: "Refugio Sur",
    supervivientesAsignados: ["Diego"],
    prioridad: 5,
    descripcion: "Buscar a los rezagados del puente",
});
console.log(`MIS-003 asignada: ${rescate}`);

const completada = completarMision("MIS-001", new Map([
    [TipoRecurso.AGUA, 10],
    [TipoRecurso.MEDICINAS, 4],
]));
console.log(`MIS-001 completada: ${completada}`);

// Parte 3: alertas e informe.
console.log("\n--- Alertas ---");
refugios["Refugio Sur"].estado = evaluarAmenaza(12, 3.5);
console.log(`Estado del Refugio Sur: ${refugios["Refugio Sur"].estado}`);
console.log(`Horda a 800 metros: ${evaluarAmenaza(35, 0.8)}`);

const desdeCentral = transferirRecursosEmergencia(
    "Refugio Central",
    "Refugio Sur",
    20,
);
console.log(`Transferencia desde el Refugio Central: ${desdeCentral}`);

const desdeSur = transferirRecursosEmergencia(
    "Refugio Sur",
    "Refugio Central",
    50,
);
console.log(`Transferencia desde el Refugio Sur: ${desdeSur}`);

console.log("\n--- Informe de la red ---");
console.log(generarInforme());

// Bonus.
console.log("\n--- Bonus ---");
for (const recomendacion of recomendarTransferencias()) {
    console.log(recomendacion);
}
console.log(`Evacuar Sur a Central: ${iniciarEvacuacion(
    "Refugio Sur",
    "Refugio Central",
)}`);
console.log(`Evacuar Norte a Sur: ${iniciarEvacuacion(
    "Refugio Norte",
    "Refugio Sur",
)}`);
