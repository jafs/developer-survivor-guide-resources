// Ejercicio 13.1: Tu primera clase zombi.

class ZombiBasico {
    tipo: string;
    salud: number;
    velocidad: number;

    constructor(tipo: string, velocidad: number) {
        this.tipo = tipo;
        this.velocidad = velocidad;
        // Salud aleatoria entre 80 y 100: 21 valores posibles.
        this.salud = Math.floor(Math.random() * 21) + 80;
    }

    grunir(): void {
        console.log(`${this.tipo}: ¡Grrraaaah!`);
    }

    recibirDano(cantidad: number): void {
        this.salud = Math.max(0, this.salud - cantidad);
    }

    mostrarInfo(): void {
        console.log(
            `${this.tipo} | Salud: ${this.salud} | ` +
            `Velocidad: ${this.velocidad}`
        );
    }
}

const caminante = new ZombiBasico("Caminante", 2);
caminante.grunir();
caminante.recibirDano(30);
caminante.mostrarInfo();

const corredor = new ZombiBasico("Corredor", 8);
corredor.grunir();
corredor.recibirDano(120); // La salud se queda en 0.
corredor.mostrarInfo();
