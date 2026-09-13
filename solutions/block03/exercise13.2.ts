// Ejercicio 13.2: Análisis de amenazas avanzado.

class ZombiAtacante {
    tipo: string;
    salud: number;
    velocidad: number;
    ubicacionesVisitadas: string[];

    constructor(tipo: string, velocidad: number) {
        this.tipo = tipo;
        this.velocidad = velocidad;
        // Salud aleatoria entre 80 y 100.
        this.salud = Math.floor(Math.random() * 21) + 80;
        this.ubicacionesVisitadas = [];
    }

    calcularNivelAmenaza(): string {
        const puntuacion = this.salud + this.velocidad * 10;
        if (puntuacion >= 130) {
            return "Crítica";
        }
        if (puntuacion >= 80) {
            return "Alta";
        }
        if (puntuacion >= 40) {
            return "Media";
        }
        return "Baja";
    }

    esPrioridadAlta(): boolean {
        return this.salud >= 50 && this.velocidad >= 6;
    }

    moverA(ubicacion: string): void {
        this.ubicacionesVisitadas.push(ubicacion);
    }

    recibirDano(cantidad: number): void {
        this.salud = Math.max(0, this.salud - cantidad);
        if (this.salud === 0) {
            console.log(`${this.tipo}: Amenaza eliminada`);
        }
    }

    generarReporte(): void {
        console.log(`--- ${this.tipo} ---`);
        console.log(`Salud: ${this.salud} | Velocidad: ${this.velocidad}`);
        console.log(`Amenaza: ${this.calcularNivelAmenaza()}`);
        console.log(`Prioridad alta: ${this.esPrioridadAlta()}`);
        console.log(`Recorrido: ${this.ubicacionesVisitadas.join(" - ")}`);
    }
}

// Un día de reconocimiento.
const velocista = new ZombiAtacante("Velocista", 9);
velocista.moverA("Puerta Norte");
velocista.moverA("Patio Central");
console.log(`Amenaza: ${velocista.calcularNivelAmenaza()}`);

const caminante = new ZombiAtacante("Caminante", 2);
caminante.moverA("Muro Este");
caminante.recibirDano(60);

velocista.generarReporte();
caminante.generarReporte();

caminante.recibirDano(100);
