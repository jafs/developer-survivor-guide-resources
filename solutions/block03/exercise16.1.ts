// Ejercicio 16.1: Especialistas de combate.

type Accion = "atacar" | "habilidad" | "evaluar";

abstract class EspecialistaCombate {
    protected nombre: string;
    protected salud: number = 100;
    protected energia: number = 100;
    protected experiencia: number = 0;

    public constructor(nombre: string) {
        this.nombre = nombre;
    }

    // Experiencia según la acción realizada.
    protected ganarExperiencia(accion: Accion): void {
        switch (accion) {
            case "atacar":
                this.experiencia += 2;
                break;
            case "habilidad":
                this.experiencia += 4;
                break;
            case "evaluar":
                this.experiencia += 1;
                break;
        }
    }

    protected gastarEnergia(cantidad: number): void {
        this.energia = Math.max(0, this.energia - cantidad);
    }

    public mostrarEstado(): void {
        console.log(
            `${this.nombre} | Salud: ${this.salud} | ` +
            `Energía: ${this.energia} | Experiencia: ${this.experiencia}`
        );
    }

    public abstract atacar(objetivo: string): void;
    public abstract habilidadEspecial(): void;
    public abstract evaluarSituacion(): string;
}

class EspecialistaLargaDistancia extends EspecialistaCombate {
    public override atacar(objetivo: string): void {
        console.log(`${this.nombre} dispara con precisión a ${objetivo}`);
        this.gastarEnergia(10);
        this.ganarExperiencia("atacar");
    }

    public override habilidadEspecial(): void {
        console.log(`${this.nombre} hace un reconocimiento desde la torre`);
        this.gastarEnergia(15);
        this.ganarExperiencia("habilidad");
    }

    public override evaluarSituacion(): string {
        this.ganarExperiencia("evaluar");
        return `${this.nombre}: tres objetivos a tiro en el patio`;
    }
}

class EspecialistaMedicina extends EspecialistaCombate {
    public override atacar(objetivo: string): void {
        console.log(`${this.nombre} contiene a ${objetivo} con la lanza`);
        this.gastarEnergia(8);
        this.ganarExperiencia("atacar");
    }

    public override habilidadEspecial(): void {
        this.salud = Math.min(100, this.salud + 20);
        console.log(`${this.nombre} atiende a los heridos de la enfermería`);
        this.gastarEnergia(20);
        this.ganarExperiencia("habilidad");
    }

    public override evaluarSituacion(): string {
        this.ganarExperiencia("evaluar");
        return `${this.nombre}: dos heridos leves, ninguno grave`;
    }
}

class EspecialistaExplosivos extends EspecialistaCombate {
    public override atacar(objetivo: string): void {
        console.log(`${this.nombre} lanza una carga contra ${objetivo}`);
        this.gastarEnergia(12);
        this.ganarExperiencia("atacar");
    }

    public override habilidadEspecial(): void {
        console.log(`${this.nombre} derriba el muro del pasillo B`);
        this.gastarEnergia(25);
        this.ganarExperiencia("habilidad");
    }

    public override evaluarSituacion(): string {
        this.ganarExperiencia("evaluar");
        return `${this.nombre}: el ala oeste aguanta una detonación más`;
    }
}

// Prueba creando un equipo mixto.
const equipo: EspecialistaCombate[] = [
    new EspecialistaLargaDistancia("Ana"),
    new EspecialistaMedicina("Julia"),
    new EspecialistaExplosivos("Diego"),
];

equipo.forEach((especialista) => {
    especialista.atacar("zombi velocista");
    especialista.habilidadEspecial();
    console.log(especialista.evaluarSituacion());
    especialista.mostrarEstado();
});
