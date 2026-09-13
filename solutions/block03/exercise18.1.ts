// Ejercicio 18.1: Escuadrones de recogida.

class Equipo {
    public readonly nombre: string;
    private durabilidad: number = 100;

    public constructor(nombre: string) {
        this.nombre = nombre;
    }

    public get durabilidadActual(): number {
        return this.durabilidad;
    }

    public usar(): void {
        this.durabilidad = Math.max(0, this.durabilidad - 20);
    }

    public reparar(): void {
        this.durabilidad = 100;
    }
}

class Combatiente {
    public readonly nombre: string;
    // Asociación opcional: null mientras no lleve equipo.
    private equipo: Equipo | null = null;

    public constructor(nombre: string) {
        this.nombre = nombre;
    }

    public equipar(equipo: Equipo): void {
        this.equipo = equipo;
    }

    public get equipoAsignado(): Equipo | null {
        return this.equipo;
    }

    public actuar(orden: string): void {
        if (this.equipo === null) {
            console.log(`  ${this.nombre}: ${orden}, sin equipo`);
            return;
        }
        this.equipo.usar();
        console.log(`  ${this.nombre}: ${orden}, con ${this.equipo.nombre}`);
    }

    public describir(): string {
        if (this.equipo === null) {
            return `${this.nombre} (sin equipo)`;
        }
        const durabilidad = this.equipo.durabilidadActual;
        return `${this.nombre} (${this.equipo.nombre}, ${durabilidad})`;
    }
}

// Asociación uno a muchos: un escuadrón agrupa a varios combatientes.
class Escuadron {
    public readonly nombre: string;
    private combatientes: Combatiente[] = [];

    public constructor(nombre: string) {
        this.nombre = nombre;
    }

    public agregarCombatiente(combatiente: Combatiente): void {
        this.combatientes.push(combatiente);
    }

    public quitarCombatiente(nombre: string): Combatiente | undefined {
        const posicion = this.combatientes.findIndex(
            (combatiente) => combatiente.nombre === nombre,
        );
        if (posicion === -1) {
            return undefined;
        }
        return this.combatientes.splice(posicion, 1)[0];
    }

    public actuar(orden: string): void {
        console.log(`Escuadrón ${this.nombre}:`);
        for (const combatiente of this.combatientes) {
            combatiente.actuar(orden);
        }
    }

    // Devuelve una copia para que nadie cambie la lista desde fuera.
    public obtenerCombatientes(): Combatiente[] {
        return [...this.combatientes];
    }
}

// Dependencia: el taller usa el escuadrón, pero no lo guarda.
class Taller {
    public repararEquipos(escuadron: Escuadron): void {
        console.log(`\nEl taller repara el equipo de ${escuadron.nombre}`);
        for (const combatiente of escuadron.obtenerCombatientes()) {
            combatiente.equipoAsignado?.reparar();
        }
    }
}

// Bonus: clase asociativa con los datos de cada traslado.
class Traslado {
    private readonly combatiente: Combatiente;
    private readonly origen: Escuadron;
    private readonly destino: Escuadron;

    public constructor(
        combatiente: Combatiente,
        origen: Escuadron,
        destino: Escuadron,
    ) {
        this.combatiente = combatiente;
        this.origen = origen;
        this.destino = destino;
    }

    public describir(): string {
        return `${this.combatiente.nombre}: de ${this.origen.nombre} ` +
            `a ${this.destino.nombre}`;
    }
}

class Comandante {
    private readonly nombre: string;
    private escuadrones: Escuadron[] = [];
    private traslados: Traslado[] = [];

    public constructor(nombre: string) {
        this.nombre = nombre;
    }

    public agregarEscuadron(escuadron: Escuadron): void {
        this.escuadrones.push(escuadron);
    }

    private buscarEscuadron(nombre: string): Escuadron | undefined {
        return this.escuadrones.find(
            (escuadron) => escuadron.nombre === nombre,
        );
    }

    public ordenGeneral(orden: string): void {
        console.log(`\n${this.nombre} ordena a todos: ${orden}`);
        for (const escuadron of this.escuadrones) {
            escuadron.actuar(orden);
        }
    }

    public ordenEspecifica(nombreEscuadron: string, orden: string): void {
        const escuadron = this.buscarEscuadron(nombreEscuadron);
        if (escuadron === undefined) {
            console.log(`\nNo existe el escuadrón ${nombreEscuadron}`);
            return;
        }
        console.log(`\n${this.nombre} ordena a ${nombreEscuadron}: ${orden}`);
        escuadron.actuar(orden);
    }

    public transferirCombatiente(
        nombreCombatiente: string,
        nombreOrigen: string,
        nombreDestino: string,
    ): void {
        const origen = this.buscarEscuadron(nombreOrigen);
        const destino = this.buscarEscuadron(nombreDestino);
        if (origen === undefined || destino === undefined) {
            console.log("\nTraslado cancelado: falta algún escuadrón");
            return;
        }

        const combatiente = origen.quitarCombatiente(nombreCombatiente);
        if (combatiente === undefined) {
            console.log(`\n${nombreCombatiente} no está en ${nombreOrigen}`);
            return;
        }

        destino.agregarCombatiente(combatiente);
        this.traslados.push(new Traslado(combatiente, origen, destino));
        console.log(
            `\n${nombreCombatiente} pasa de ${nombreOrigen} a ${nombreDestino}`
        );
    }

    public mostrarInforme(): void {
        console.log(`\n=== INFORME DE ${this.nombre.toUpperCase()} ===`);
        for (const escuadron of this.escuadrones) {
            console.log(`Escuadrón ${escuadron.nombre}:`);
            for (const combatiente of escuadron.obtenerCombatientes()) {
                console.log(`  - ${combatiente.describir()}`);
            }
        }
        if (this.traslados.length > 0) {
            console.log("Traslados:");
            for (const traslado of this.traslados) {
                console.log(`  - ${traslado.describir()}`);
            }
        }
    }
}

const comandante = new Comandante("Marcos");
const alfa = new Escuadron("Alfa");
const bravo = new Escuadron("Bravo");

const ana = new Combatiente("Ana");
ana.equipar(new Equipo("Machete"));
const amaiaCombatiente = new Combatiente("Amaia");
amaiaCombatiente.equipar(new Equipo("Ballesta"));

alfa.agregarCombatiente(ana);
alfa.agregarCombatiente(amaiaCombatiente);
bravo.agregarCombatiente(new Combatiente("Julia"));

comandante.agregarEscuadron(alfa);
comandante.agregarEscuadron(bravo);

comandante.ordenGeneral("asegurar el perímetro");
comandante.ordenEspecifica("Alfa", "recoger leña");
comandante.transferirCombatiente("Amaia", "Alfa", "Bravo");
comandante.mostrarInforme();

new Taller().repararEquipos(alfa);
comandante.mostrarInforme();
