// Ejercicio 15.1: Calculadora de recursos.

type Recursos = {
    municion: number;
    vendas: number;
    agua: number;
};

class CalculadoraRecursos {
    public static readonly MUNICION_POR_PERSONA = 30;
    public static readonly VENDAS_POR_PERSONA = 5;
    public static readonly AGUA_POR_PERSONA = 2;

    public static calcularNecesidades(supervivientes: number): Recursos {
        return {
            municion: supervivientes * CalculadoraRecursos.MUNICION_POR_PERSONA,
            vendas: supervivientes * CalculadoraRecursos.VENDAS_POR_PERSONA,
            agua: supervivientes * CalculadoraRecursos.AGUA_POR_PERSONA,
        };
    }

    // Devuelve los recursos que faltan. Si no falta nada, el array está vacío.
    public static validarRecursos(
        disponibles: Recursos,
        supervivientes: number,
    ): string[] {
        const necesarios =
            CalculadoraRecursos.calcularNecesidades(supervivientes);
        const faltan: string[] = [];

        if (disponibles.municion < necesarios.municion) {
            faltan.push("munición");
        }
        if (disponibles.vendas < necesarios.vendas) {
            faltan.push("vendas");
        }
        if (disponibles.agua < necesarios.agua) {
            faltan.push("agua");
        }
        return faltan;
    }
}

console.log("=== CALCULADORA DE RECURSOS PARA EL ASALTO ===");

const necesidades = CalculadoraRecursos.calcularNecesidades(12);
console.log(
    `Para 12 personas: ${necesidades.municion} balas, ` +
    `${necesidades.vendas} vendas y ${necesidades.agua} litros de agua`
);

const almacenLleno: Recursos = { municion: 400, vendas: 70, agua: 30 };
const faltanLleno = CalculadoraRecursos.validarRecursos(almacenLleno, 12);
console.log(`Faltan con el almacén lleno: ${faltanLleno.length}`);

const pocaAgua: Recursos = { municion: 400, vendas: 70, agua: 10 };
const faltanAgua = CalculadoraRecursos.validarRecursos(pocaAgua, 12);
console.log(`Faltan con poca agua: ${faltanAgua.join(", ")}`);

// Bonus: identificadores automáticos.
class Superviviente {
    private static contadorId = 0;
    public static readonly PREFIJO_ID = "SURV";

    public readonly id: string;
    public readonly nombre: string;

    public constructor(nombre: string) {
        Superviviente.contadorId++;
        const numero = Superviviente.contadorId.toString().padStart(4, "0");
        this.id = `${Superviviente.PREFIJO_ID}-${numero}`;
        this.nombre = nombre;
    }
}

console.log("\n=== REGISTRO DE SUPERVIVIENTES ===");
const registrados = [
    new Superviviente("Ana"),
    new Superviviente("Marcos"),
    new Superviviente("Amaia"),
];
for (const superviviente of registrados) {
    console.log(`${superviviente.id}: ${superviviente.nombre}`);
}
