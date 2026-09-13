// Desafío 3: Torres de defensa de la cárcel.

// === INTERFAZ COMÚN ===

// Todo lo que aparece en el informe de la batalla.
interface Informable {
    generarInforme(): string;
}

// === PARTE 1: ZOMBIS ===

abstract class Zombi implements Informable {
    protected salud: number;
    protected distancia: number; // Metros hasta la muralla.

    public constructor(salud: number, distancia: number) {
        this.salud = salud;
        this.distancia = distancia;
    }

    public get estaVivo(): boolean {
        return this.salud > 0;
    }

    public get metrosHastaMuralla(): number {
        return this.distancia;
    }

    public recibirDano(cantidad: number): void {
        this.salud = Math.max(0, this.salud - cantidad);
    }

    // Avanza sin pasar de la muralla.
    protected acercarse(metros: number): void {
        this.distancia = Math.max(0, this.distancia - metros);
    }

    public generarInforme(): string {
        return `${this.obtenerTipo()}: ${this.salud} de salud, ` +
            `a ${this.distancia} m`;
    }

    public abstract avanzar(): void;
    public abstract obtenerTipo(): string;
}

class ZombiCaminante extends Zombi {
    public constructor(distancia: number) {
        super(120, distancia);
    }

    public override avanzar(): void {
        this.acercarse(5);
    }

    public override obtenerTipo(): string {
        return "Caminante";
    }
}

class ZombiVelocista extends Zombi {
    public constructor(distancia: number) {
        super(60, distancia);
    }

    public override avanzar(): void {
        this.acercarse(15);
    }

    public override obtenerTipo(): string {
        return "Velocista";
    }
}

class ZombiAtleta extends Zombi {
    private turnos: number = 0;

    public constructor(distancia: number) {
        super(90, distancia);
    }

    // Cada tres turnos, un sprint.
    public override avanzar(): void {
        this.turnos++;
        this.acercarse(this.turnos % 3 === 0 ? 20 : 10);
    }

    public override obtenerTipo(): string {
        return "Atleta";
    }
}

// === PARTE 2: TORRES ===

abstract class TorreDefensiva implements Informable {
    protected readonly nombre: string;
    protected readonly dano: number;
    protected readonly alcance: number;
    protected municion: number;
    protected abatidos: number = 0;

    public constructor(
        nombre: string,
        dano: number,
        alcance: number,
        municion: number,
    ) {
        this.nombre = nombre;
        this.dano = dano;
        this.alcance = alcance;
        this.municion = municion;
    }

    public get estaOperativa(): boolean {
        return this.municion > 0;
    }

    public get municionRestante(): number {
        return this.municion;
    }

    public recargar(cantidad: number): void {
        this.municion += cantidad;
    }

    // Zombis vivos a su alcance.
    protected buscarObjetivos(zombis: Zombi[]): Zombi[] {
        return zombis.filter(
            (zombi) =>
                zombi.estaVivo && zombi.metrosHastaMuralla <= this.alcance,
        );
    }

    protected impactar(zombi: Zombi): void {
        zombi.recibirDano(this.dano);
        if (!zombi.estaVivo) {
            this.abatidos++;
        }
    }

    public generarInforme(): string {
        return `${this.nombre}: ${this.municion} de munición, ` +
            `${this.abatidos} abatidos`;
    }

    public abstract disparar(zombis: Zombi[]): void;
}

// Dispara al zombi vivo más cercano dentro de su alcance.
class TorreLargoAlcance extends TorreDefensiva {
    public constructor(nombre: string, municion: number) {
        super(nombre, 40, 100, municion);
    }

    public override disparar(zombis: Zombi[]): void {
        const objetivos = this.buscarObjetivos(zombis).toSorted(
            (primero, segundo) =>
                primero.metrosHastaMuralla - segundo.metrosHastaMuralla,
        );
        if (objetivos.length === 0 || !this.estaOperativa) {
            return;
        }
        this.municion--;
        this.impactar(objetivos[0]);
    }
}

// Un disparo a cada zombi a su alcance, mientras le quede munición.
class TorreAmetralladora extends TorreDefensiva {
    public constructor(nombre: string, municion: number) {
        super(nombre, 15, 40, municion);
    }

    public override disparar(zombis: Zombi[]): void {
        for (const zombi of this.buscarObjetivos(zombis)) {
            if (!this.estaOperativa) {
                return;
            }
            this.municion--;
            this.impactar(zombi);
        }
    }
}

// Una llamarada alcanza a todos los zombis cercanos y gasta 1 de munición.
class TorreLanzallamas extends TorreDefensiva {
    public constructor(nombre: string, municion: number) {
        super(nombre, 50, 15, municion);
    }

    public override disparar(zombis: Zombi[]): void {
        const objetivos = this.buscarObjetivos(zombis);
        if (objetivos.length === 0 || !this.estaOperativa) {
            return;
        }
        this.municion--;
        for (const zombi of objetivos) {
            this.impactar(zombi);
        }
    }
}

// === PARTE 3: PROTOCOLOS Y SISTEMA DE DEFENSA ===

class ProtocolosDefensa {
    public static readonly MUNICION_CRITICA = 5;
    public static readonly RECARGA_EMERGENCIA = 10;
    public static readonly DISTANCIA_PELIGRO = 20;

    public static evaluarOleada(zombis: Zombi[]): string {
        const vivos = zombis.filter((zombi) => zombi.estaVivo);
        const hayZombisCerca = vivos.some(
            (zombi) =>
                zombi.metrosHastaMuralla < ProtocolosDefensa.DISTANCIA_PELIGRO,
        );
        if (hayZombisCerca) {
            return "alta";
        }
        if (vivos.length > 5) {
            return "media";
        }
        return "baja";
    }
}

type ResultadoBatalla = "victoria" | "derrota" | null;

class SistemaDefensa {
    private torres: TorreDefensiva[] = [];
    private oleada: Zombi[] = [];
    private reservaMunicion: number;
    private turno: number = 0;

    public constructor(reservaMunicion: number) {
        this.reservaMunicion = reservaMunicion;
    }

    public desplegarTorre(torre: TorreDefensiva): void {
        this.torres.push(torre);
    }

    public recibirOleada(zombis: Zombi[]): void {
        this.oleada = zombis;
    }

    public ejecutarTurno(): void {
        this.turno++;

        // 1. Las torres operativas disparan.
        for (const torre of this.torres) {
            if (torre.estaOperativa) {
                torre.disparar(this.oleada);
            }
        }

        // 2. Los zombis que siguen vivos avanzan.
        for (const zombi of this.oleada) {
            if (zombi.estaVivo) {
                zombi.avanzar();
            }
        }

        // 3. Las torres con poca munición reciben la de la reserva.
        this.reabastecer();
    }

    private reabastecer(): void {
        for (const torre of this.torres) {
            const municionBaja =
                torre.municionRestante < ProtocolosDefensa.MUNICION_CRITICA;
            if (municionBaja && this.reservaMunicion > 0) {
                const cantidad = Math.min(
                    ProtocolosDefensa.RECARGA_EMERGENCIA,
                    this.reservaMunicion,
                );
                torre.recargar(cantidad);
                this.reservaMunicion -= cantidad;
            }
        }
    }

    public comprobarResultado(): ResultadoBatalla {
        const vivos = this.oleada.filter((zombi) => zombi.estaVivo);
        if (vivos.length === 0) {
            return "victoria";
        }
        if (vivos.some((zombi) => zombi.metrosHastaMuralla === 0)) {
            return "derrota";
        }
        return null;
    }

    public mostrarEstado(): void {
        const amenaza = ProtocolosDefensa.evaluarOleada(this.oleada);
        console.log(`\n--- Turno ${this.turno} (amenaza ${amenaza}) ---`);

        // Torres y zombis se tratan igual gracias a la interfaz común.
        const informables: Informable[] = [
            ...this.torres,
            ...this.oleada.filter((zombi) => zombi.estaVivo),
        ];
        for (const elemento of informables) {
            console.log(`  ${elemento.generarInforme()}`);
        }
        console.log(`  Reserva de munición: ${this.reservaMunicion}`);
    }
}

// === PARTE 4: LA BATALLA ===

const TURNOS_MAXIMOS: number = 30;

const sistema = new SistemaDefensa(40);
sistema.desplegarTorre(new TorreLargoAlcance("Torre Norte", 15));
sistema.desplegarTorre(new TorreAmetralladora("Torre Este", 30));
sistema.desplegarTorre(new TorreLanzallamas("Puerta principal", 6));

sistema.recibirOleada([
    new ZombiCaminante(45),
    new ZombiCaminante(60),
    new ZombiCaminante(80),
    new ZombiVelocista(90),
    new ZombiVelocista(120),
    new ZombiVelocista(150),
    new ZombiAtleta(70),
    new ZombiAtleta(100),
]);

console.log("=== DEFENSA DE LA CÁRCEL ===");

let resultado: ResultadoBatalla = null;
for (let turno = 1; turno <= TURNOS_MAXIMOS && resultado === null; turno++) {
    sistema.ejecutarTurno();
    sistema.mostrarEstado();
    resultado = sistema.comprobarResultado();
}

if (resultado === "victoria") {
    console.log("\nLa horda ha caído. La cárcel resiste.");
} else if (resultado === "derrota") {
    console.log("\nLos zombis han llegado a la muralla. Hay que evacuar.");
} else {
    console.log("\nLa batalla sigue tras el último turno.");
}

// === BONUS: UN ZOMBI NUEVO SIN TOCAR EL SISTEMA ===

class ZombiMutante extends Zombi {
    public constructor(distancia: number) {
        super(150, distancia);
    }

    // Avanza despacio y se regenera, sin pasar de su salud inicial.
    public override avanzar(): void {
        this.acercarse(8);
        this.salud = Math.min(150, this.salud + 5);
    }

    public override obtenerTipo(): string {
        return "Mutante";
    }
}

console.log("\n=== BONUS: LLEGA UN MUTANTE ===");

const sistemaOeste = new SistemaDefensa(20);
sistemaOeste.desplegarTorre(new TorreLargoAlcance("Torre Oeste", 20));
sistemaOeste.recibirOleada([new ZombiMutante(90), new ZombiCaminante(70)]);

let resultadoOeste: ResultadoBatalla = null;
let turnosOeste = 0;
while (resultadoOeste === null && turnosOeste < TURNOS_MAXIMOS) {
    sistemaOeste.ejecutarTurno();
    resultadoOeste = sistemaOeste.comprobarResultado();
    turnosOeste++;
}
sistemaOeste.mostrarEstado();
console.log(`Resultado en el ala oeste: ${resultadoOeste}`);
