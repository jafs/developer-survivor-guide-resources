// Ejercicio 17.2: Sistema de comando táctico.

abstract class CombatienteBase {
    private readonly nombreCombatiente: string;
    private puntosSalud: number = 100;

    public constructor(nombre: string) {
        this.nombreCombatiente = nombre;
    }

    public get nombre(): string {
        return this.nombreCombatiente;
    }

    public get salud(): number {
        return this.puntosSalud;
    }

    public recibirDano(cantidad: number): void {
        this.puntosSalud = Math.max(0, this.puntosSalud - cantidad);
    }

    public recuperarSalud(puntos: number): void {
        this.puntosSalud = Math.min(100, this.puntosSalud + puntos);
    }

    public abstract ejecutarOrden(orden: string, objetivo: string): void;
    public abstract misionEspecial(equipo: CombatienteBase[]): void;
}

class LiderCombatiente extends CombatienteBase {
    public override ejecutarOrden(orden: string, objetivo: string): void {
        console.log(`${this.nombre} dirige "${orden}" contra ${objetivo}`);
    }

    public override misionEspecial(equipo: CombatienteBase[]): void {
        const nombres = equipo.map((combatiente) => combatiente.nombre);
        console.log(`${this.nombre} coordina a: ${nombres.join(", ")}`);
    }
}

class AuxiliarEnMedicinaCombatiente extends CombatienteBase {
    public override ejecutarOrden(orden: string, objetivo: string): void {
        console.log(`${this.nombre} cubre al grupo frente a ${objetivo}`);
    }

    public override misionEspecial(equipo: CombatienteBase[]): void {
        if (equipo.length === 0) {
            return;
        }
        // Busca a quien menos salud tiene.
        const masHerido = equipo.reduce(
            (peor, combatiente) =>
                combatiente.salud < peor.salud ? combatiente : peor,
            equipo[0],
        );
        masHerido.recuperarSalud(30);
        console.log(
            `${this.nombre} cura a ${masHerido.nombre}. ` +
            `Salud: ${masHerido.salud}`
        );
    }
}

class ScoutCombatiente extends CombatienteBase {
    private readonly zona: string;

    public constructor(nombre: string, zona: string) {
        super(nombre);
        this.zona = zona;
    }

    public override ejecutarOrden(orden: string, objetivo: string): void {
        console.log(`${this.nombre} flanquea a ${objetivo} para "${orden}"`);
    }

    // No necesita a la unidad para reconocer su zona.
    public override misionEspecial(): void {
        console.log(`${this.nombre} reconoce el ${this.zona}: sin novedad`);
    }
}

class ComandoTactico {
    private combatientes: CombatienteBase[] = [];

    public agregarCombatiente(combatiente: CombatienteBase): void {
        this.combatientes.push(combatiente);
    }

    public ordenGeneral(orden: string, objetivo: string): void {
        console.log(`\nOrden general: ${orden}`);
        for (const combatiente of this.combatientes) {
            combatiente.ejecutarOrden(orden, objetivo);
        }
    }

    // Sin instanceof: cada clase implementa su propia misión especial.
    public misionEspecializada(): void {
        console.log("\nMisiones especiales:");
        for (const combatiente of this.combatientes) {
            combatiente.misionEspecial(this.combatientes);
        }
    }
}

const comando = new ComandoTactico();
const amaia = new ScoutCombatiente("Amaia", "patio norte");

comando.agregarCombatiente(new LiderCombatiente("Marcos"));
comando.agregarCombatiente(new AuxiliarEnMedicinaCombatiente("Julia"));
comando.agregarCombatiente(amaia);

amaia.recibirDano(45);
comando.ordenGeneral("atacar", "horda zombi");
comando.misionEspecializada();
