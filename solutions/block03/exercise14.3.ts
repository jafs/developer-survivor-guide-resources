// Ejercicio 14.3: Identificación de roles.

class Superviviente {
    nombre: string;
    rango: string;
    salud: number;

    constructor(nombre: string, rango: string = "superviviente") {
        this.nombre = nombre;
        this.rango = rango;
        this.salud = 100;
    }

    curar(salud: number): void {
        this.salud = Math.min(100, this.salud + salud);
    }

    obtenerEstado(): string {
        return `${this.nombre} [${this.rango}] - S:${this.salud}`;
    }

    recibirDano(cantidad: number): void {
        this.salud = Math.max(0, this.salud - cantidad);
    }
}

class AuxiliarEnMedicina extends Superviviente {
    botiquines: number;
    energia: number = 100;

    constructor(nombre: string, botiquines: number = 3) {
        super(nombre, "auxiliar en medicina");
        this.botiquines = botiquines;
    }

    atenderHerido(herido: Superviviente, puntos: number): boolean {
        if (this.botiquines < 1 || this.energia < 20) {
            return false;
        }

        herido.curar(puntos);
        this.botiquines--;
        this.energia -= 20;
        return true;
    }

    obtenerEstado(): string {
        return `${super.obtenerEstado()} | Botiquines: ${this.botiquines}`;
    }
}

class Scout extends Superviviente {
    rutasConocidas: string[] = [];
    equipoExploracion: string[];
    energia: number = 120;

    constructor(nombre: string, equipoExploracion: string[]) {
        super(nombre, "cuerpo de exploración");
        this.equipoExploracion = equipoExploracion;
    }

    explorarRuta(nombreRuta: string): void {
        this.rutasConocidas.push(nombreRuta);
    }

    recibirDano(cantidad: number): void {
        super.recibirDano(cantidad * 0.9);
    }

    obtenerEstado(): string {
        return (
            `${super.obtenerEstado()} | ` +
            `Rutas conocidas: ${this.rutasConocidas.length}`
        );
    }
}

class LiderEquipo extends Superviviente {
    equipoAsignado: Superviviente[];
    misionesCompletadas: number;

    constructor(nombre: string) {
        super(nombre, "líder de equipo");
        this.equipoAsignado = [];
        this.misionesCompletadas = 0;
    }

    asignarSuperviviente(superviviente: Superviviente): boolean {
        if (this.equipoAsignado.length >= 4) {
            console.log(`${this.nombre}: Equipo completo`);
            return false;
        }

        this.equipoAsignado.push(superviviente);
        console.log(`Se asignó ${superviviente.nombre} al equipo`);
        return true;
    }

    coordinarRetirada(destino: string): void {
        this.misionesCompletadas++;
        console.log(`${this.nombre} coordinó retirada hacia ${destino}`);
    }

    obtenerEstado(): string {
        const estadoBase = super.obtenerEstado();
        return (
            `${estadoBase} | Equipo: ${this.equipoAsignado.length}/4 | ` +
            `Misiones: ${this.misionesCompletadas}`
        );
    }
}

function asignarTareaEmergencia(persona: Superviviente): string {
    if (persona instanceof LiderEquipo) {
        return "Coordinar la evacuación y dirigir al grupo";
    } else if (persona instanceof AuxiliarEnMedicina) {
        return "Atender a los heridos y preparar suministros médicos";
    } else if (persona instanceof Scout) {
        return "Explorar rutas de escape y reconocer el terreno";
    } else {
        return "Proteger al grupo y seguir las órdenes del líder";
    }
}

// Prueba: Grupo mixto durante la evacuación
const grupo = [
    new Superviviente("Ana", "combatiente"),
    new AuxiliarEnMedicina("Julia", 5),
    new Scout("Amaia", ["brújula"]),
    new LiderEquipo("Marcos")
];

console.log("=== ASIGNACIÓN DE TAREAS DE EMERGENCIA ===");
grupo.forEach(persona => {
    console.log(`${persona.nombre}: ${asignarTareaEmergencia(persona)}`);
});

console.log("\n=== VERIFICACIÓN DE TIPOS ===");
grupo.forEach(persona => {
    const esLider = persona instanceof LiderEquipo;
    const esMedico = persona instanceof AuxiliarEnMedicina;
    const esScout = persona instanceof Scout;
    const esSuperviviente = persona instanceof Superviviente;

    console.log(
        `${persona.nombre}: ` +
        `Líder=${esLider}, Médico=${esMedico}, Scout=${esScout}, ` +
        `Superviviente=${esSuperviviente}`
    );
});
