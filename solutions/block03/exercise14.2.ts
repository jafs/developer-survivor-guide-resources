// Ejercicio 14.2: El cuerpo de exploración.

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

class Scout extends Superviviente {
    rutasConocidas: string[] = [];
    equipoExploracion: string[];
    energia: number = 120;

    constructor(nombre: string, equipoExploracion: string[]) {
        super(nombre, "cuerpo de exploración");
        this.equipoExploracion = equipoExploracion;
    }

    explorarRuta(nombreRuta: string): void {
        // Explorar una ruta gasta 15 de energía.
        if (this.energia < 15) {
            console.log(`${this.nombre} no tiene energía para: ${nombreRuta}`);
            return;
        }
        this.energia -= 15;
        this.rutasConocidas.push(nombreRuta);
        console.log(`${this.nombre} ha explorado la ruta: ${nombreRuta}`);
    }

    override recibirDano(cantidad: number): void {
        // Sabe moverse sin exponerse: recibe un 10 % menos de daño.
        super.recibirDano(cantidad * 0.9);
    }

    override obtenerEstado(): string {
        return (
            `${super.obtenerEstado()} | ` +
            `Rutas conocidas: ${this.rutasConocidas.length} | ` +
            `Energía: ${this.energia}`
        );
    }
}

// Prueba: un explorador reconociendo el terreno.
const scout = new Scout("Amaia", ["brújula", "binoculares"]);
scout.explorarRuta("Pueblo perdido");
console.log(scout.obtenerEstado());

// Con 120 de energía llega para 8 rutas: la novena no se explora.
for (let ruta = 2; ruta <= 9; ruta++) {
    scout.explorarRuta(`Ruta ${ruta}`);
}
console.log(scout.obtenerEstado());

console.log("\n=== PRUEBA DE REDUCCIÓN DE DAÑO ===");
const supervivienteNormal = new Superviviente("Ana", "soldado");
supervivienteNormal.recibirDano(50);
console.log(`Ana recibe 50 de daño: ${supervivienteNormal.obtenerEstado()}`);

const scoutConReduccion = new Scout("Amaia", ["brújula"]);
scoutConReduccion.recibirDano(50);
console.log(`Amaia solo sufre 45: ${scoutConReduccion.obtenerEstado()}`);
