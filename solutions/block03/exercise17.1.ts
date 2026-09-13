// Ejercicio 17.1: Equipo nuevo sin tocar el gestor.

// === DEL CAPÍTULO, SIN CAMBIOS ===

interface Usable {
    usar(usuario: string): void;
}

class BotiquinMedico implements Usable {
    public usar(usuario: string): void {
        console.log(`${usuario} aplica primeros auxilios`);
    }
}

class GestorEquipamiento {
    private equipos: Usable[] = [];

    public agregarEquipo(equipo: Usable): void {
        this.equipos.push(equipo);
    }

    public usarTodoElEquipo(usuario: string): void {
        console.log(`${usuario} utilizando todo el equipo disponible:`);
        this.equipos.forEach((equipo) => equipo.usar(usuario));
    }
}

// === CLASES NUEVAS ===

class RadioLargoAlcance implements Usable {
    private bateria: number = 100;

    public usar(usuario: string): void {
        if (this.bateria < 40) {
            console.log(`${usuario}: la radio no tiene batería para emitir`);
            return;
        }
        this.bateria -= 40;
        console.log(`${usuario} emite por radio. Batería: ${this.bateria} %`);
    }
}

class GeneradorPortatil implements Usable {
    private litrosCombustible: number = 2;

    public usar(usuario: string): void {
        if (this.litrosCombustible === 0) {
            console.log(`${usuario}: el generador no arranca, sin combustible`);
            return;
        }
        this.litrosCombustible--;
        console.log(
            `${usuario} arranca el generador. ` +
            `Quedan ${this.litrosCombustible} litros`
        );
    }
}

const gestorSalaControl = new GestorEquipamiento();
gestorSalaControl.agregarEquipo(new RadioLargoAlcance());
gestorSalaControl.agregarEquipo(new GeneradorPortatil());
gestorSalaControl.agregarEquipo(new BotiquinMedico());

gestorSalaControl.usarTodoElEquipo("Diego");
gestorSalaControl.usarTodoElEquipo("Ana");
gestorSalaControl.usarTodoElEquipo("Marcos");
