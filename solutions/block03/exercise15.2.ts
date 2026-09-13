// Ejercicio 15.2: Gestor de inventario singleton.

class GestorInventario {
    private static instancia: GestorInventario | null = null;

    private inventario: Map<string, number>;

    // Constructor privado: nadie puede usar new desde fuera.
    private constructor() {
        this.inventario = new Map();
    }

    public static obtenerInstancia(): GestorInventario {
        if (GestorInventario.instancia === null) {
            GestorInventario.instancia = new GestorInventario();
        }
        return GestorInventario.instancia;
    }

    public agregarRecurso(recurso: string, cantidad: number): void {
        const actual = this.consultarDisponibilidad(recurso);
        this.inventario.set(recurso, actual + cantidad);
    }

    public consumirRecurso(recurso: string, cantidad: number): boolean {
        const disponible = this.consultarDisponibilidad(recurso);
        if (cantidad > disponible) {
            return false;
        }
        this.inventario.set(recurso, disponible - cantidad);
        return true;
    }

    public consultarDisponibilidad(recurso: string): number {
        return this.inventario.get(recurso) ?? 0;
    }

    public generarReporte(): void {
        console.log("=== INVENTARIO ===");
        for (const [recurso, cantidad] of this.inventario) {
            console.log(`${recurso}: ${cantidad}`);
        }
    }
}

console.log("=== GESTOR CENTRALIZADO DE INVENTARIO ===");

// Tres personas obtienen el gestor por separado.
const gestorAna = GestorInventario.obtenerInstancia();
const gestorDiego = GestorInventario.obtenerInstancia();
const gestorJulia = GestorInventario.obtenerInstancia();

gestorAna.agregarRecurso("balas", 360);

const repartoAna = gestorAna.consumirRecurso("balas", 150);
const repartoDiego = gestorDiego.consumirRecurso("balas", 150);
const repartoJulia = gestorJulia.consumirRecurso("balas", 150);
console.log(`Ana reparte 150: ${repartoAna}`);
console.log(`Diego reparte 150: ${repartoDiego}`);
console.log(`Julia reparte 150: ${repartoJulia}`);

const mismoGestor = gestorAna === gestorDiego && gestorDiego === gestorJulia;
console.log(`Las tres usan el mismo gestor: ${mismoGestor}`);

gestorJulia.generarReporte();
