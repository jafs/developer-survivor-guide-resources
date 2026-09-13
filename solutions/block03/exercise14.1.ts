// Ejercicio 14.1: Especialista auxiliar en medicina.

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
    static readonly ENERGIA_POR_CURACION = 20;

    botiquines: number;
    energia: number = 100;

    constructor(nombre: string, botiquines: number = 3) {
        super(nombre, "auxiliar en medicina");
        this.botiquines = botiquines;
    }

    atenderHerido(herido: Superviviente, puntos: number): boolean {
        const energiaNecesaria = AuxiliarEnMedicina.ENERGIA_POR_CURACION;

        if (this.botiquines < 1 || this.energia < energiaNecesaria) {
            console.log(`${this.nombre} no puede curar ahora mismo`);
            return false;
        }

        // Se usa el método heredado, que ya limita la salud a 100.
        herido.curar(puntos);
        this.botiquines--;
        this.energia -= energiaNecesaria;

        console.log(`${this.nombre} ha curado a ${herido.nombre}`);
        return true;
    }

    obtenerEstado(): string {
        return (
            `${super.obtenerEstado()} | Botiquines: ${this.botiquines} | ` +
            `Energía: ${this.energia}`
        );
    }
}

// Prueba de la implementación.
const auxiliar = new AuxiliarEnMedicina("Julia");
const herido = new Superviviente("Marcos", "soldado");
herido.recibirDano(40); // Simula que está herido. Tendrá 60 de salud.

auxiliar.atenderHerido(herido, 30);

// Marcos tendrá 90 de salud y Julia, 2 botiquines.
console.log(herido.obtenerEstado());
console.log(auxiliar.obtenerEstado());

// Caso límite: sin botiquines no se puede curar.
const auxiliarSinBotiquines = new AuxiliarEnMedicina("Julia", 0);
const pudoCurar = auxiliarSinBotiquines.atenderHerido(herido, 10);
console.log(`¿Julia pudo curar? ${pudoCurar ? "Sí" : "No"}`);
