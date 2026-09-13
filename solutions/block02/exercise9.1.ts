// Ejercicio 9.1: Gestión de inventario básico.

function anadirSuministro(inventario: string[], suministro: string): void {
    inventario.push(suministro);
}

// Saca el suministro más antiguo, el primero del inventario.
function usarPrimero(inventario: string[]): string | undefined {
    return inventario.shift();
}

function retirarSuministro(inventario: string[], suministro: string): boolean {
    const posicion = inventario.indexOf(suministro);
    if (posicion === -1) {
        return false;
    }
    inventario.splice(posicion, 1);
    return true;
}

function mostrarInventario(nombre: string, inventario: string[]): void {
    console.log(`${nombre} (${inventario.length} elementos):`);
    if (inventario.length === 0) {
        console.log("  Vacío");
        return;
    }
    inventario.forEach((suministro, indice) => {
        console.log(`  ${indice + 1}. ${suministro}`);
    });
}

// Inventarios del refugio organizados por categorías.
const suministrosMedicos: string[] = [];
const herramientasReparacion: string[] = [];
const racionesComida: string[] = [];

console.log("=== GESTIÓN DE INVENTARIO DEL REFUGIO ===");

console.log("Amanecer: llegan suministros de la expedición.");
anadirSuministro(suministrosMedicos, "vendas");
anadirSuministro(suministrosMedicos, "antibióticos");
anadirSuministro(herramientasReparacion, "llave inglesa");
anadirSuministro(herramientasReparacion, "cinta aislante");
anadirSuministro(racionesComida, "lentejas");

console.log("\nDurante el día: se usan y se retiran suministros.");
console.log(`Se usan las ${usarPrimero(suministrosMedicos)} para curar a Ana.`);
console.log(`Se cocinan las ${usarPrimero(racionesComida)} para la cena.`);
console.log(`Ya no quedan raciones: ${usarPrimero(racionesComida)}`);

const hayCinta = retirarSuministro(herramientasReparacion, "cinta aislante");
console.log(`Cinta aislante retirada: ${hayCinta}`);
const haySierra = retirarSuministro(herramientasReparacion, "sierra");
console.log(`Sierra retirada: ${haySierra}`);

console.log("\nAnochecer: inspección final.");
mostrarInventario("Suministros médicos", suministrosMedicos);
mostrarInventario("Herramientas de reparación", herramientasReparacion);
mostrarInventario("Raciones de comida", racionesComida);
