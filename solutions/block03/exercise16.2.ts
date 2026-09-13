// Ejercicio 16.2: Sistema de equipamiento modular.

interface Activable {
    encender(): void;
    apagar(): void;
    obtenerEstado(): string;
}

interface Recargable {
    recargar(cantidad: number): void;
    obtenerCarga(): number;
}

class Foco implements Activable {
    private encendido: boolean = false;

    public encender(): void {
        this.encendido = true;
    }

    public apagar(): void {
        this.encendido = false;
    }

    public obtenerEstado(): string {
        return `Foco: ${this.encendido ? "encendido" : "apagado"}`;
    }
}

class TorretaAutomatica implements Activable, Recargable {
    private encendida: boolean = false;
    private municion: number = 0;

    public encender(): void {
        if (this.municion === 0) {
            console.log("Torreta: sin munición, sigue apagada");
            return;
        }
        this.encendida = true;
    }

    public apagar(): void {
        this.encendida = false;
    }

    public obtenerEstado(): string {
        return `Torreta: ${this.encendida ? "encendida" : "apagada"}`;
    }

    public recargar(cantidad: number): void {
        this.municion += cantidad;
    }

    public obtenerCarga(): number {
        return this.municion;
    }
}

class BateriaAuxiliar implements Recargable {
    private static readonly CARGA_MAXIMA = 100;
    private carga: number = 90;

    public recargar(cantidad: number): void {
        this.carga = Math.min(
            BateriaAuxiliar.CARGA_MAXIMA,
            this.carga + cantidad,
        );
    }

    public obtenerCarga(): number {
        return this.carga;
    }
}

class ControlCentral {
    private dispositivos: (Activable | Recargable)[] = [];

    public registrar(dispositivo: Activable | Recargable): void {
        this.dispositivos.push(dispositivo);
    }

    public activarTodo(): void {
        for (const dispositivo of this.dispositivos) {
            // Las interfaces no existen en ejecución: se comprueba el método.
            if ("encender" in dispositivo) {
                dispositivo.encender();
            }
        }
    }

    public recargarTodo(cantidad: number): void {
        for (const dispositivo of this.dispositivos) {
            if ("recargar" in dispositivo) {
                dispositivo.recargar(cantidad);
            }
        }
    }

    public mostrarEstado(): void {
        console.log("--- Estado de los dispositivos ---");
        for (const dispositivo of this.dispositivos) {
            if ("obtenerEstado" in dispositivo) {
                console.log(dispositivo.obtenerEstado());
            }
            if ("obtenerCarga" in dispositivo) {
                console.log(`  Carga: ${dispositivo.obtenerCarga()}`);
            }
        }
    }
}

const control = new ControlCentral();
control.registrar(new Foco());
control.registrar(new TorretaAutomatica());
control.registrar(new BateriaAuxiliar());

control.activarTodo();
control.mostrarEstado();

control.recargarTodo(20);
control.activarTodo();
control.mostrarEstado();
