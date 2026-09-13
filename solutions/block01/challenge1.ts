// Desafío 1: Simulador de supervivencia de 7 días.
// Solo usa lo visto en el bloque 1: variables, operadores, condicionales
// y bucles.

// Consumo diario básico para mantenerse vivo.
const AGUA_CONSUMO_DIARIO: number = 2;
const COMIDA_CONSUMO_DIARIO: number = 1;
const ENERGIA_CONSUMO_DIARIO: number = 15;

// Costes de energía por actividad.
const ENERGIA_BUSCAR_AGUA: number = 5;
const ENERGIA_BUSCAR_COMIDA: number = 8;

// Descanso y límite de energía.
const ENERGIA_DESCANSO_MINIMA: number = 20;
const ENERGIA_MAXIMA: number = 100;

// Probabilidades de éxito.
const PROBABILIDAD_ENCONTRAR_AGUA: number = 0.4; // 40 % de éxito.
const PROBABILIDAD_ENCONTRAR_COMIDA: number = 0.5; // 50 % de éxito.

// Estado inicial.
let aguaDisponible: number = 8;
let comidaDisponible: number = 5;
let energiaActual: number = 100;
let diasSobrevividos: number = 0;

console.log("=== SIMULADOR DE SUPERVIVENCIA: 7 DÍAS CRÍTICOS ===");
console.log(
    "La ciudad ha caído. Aguanta 7 días hasta que llegue el convoy de rescate."
);
console.log("");
console.log("=== SITUACIÓN INICIAL ===");
console.log(`- Agua disponible: ${aguaDisponible} litros`);
console.log(`- Comida disponible: ${comidaDisponible} raciones`);
console.log(`- Energía actual: ${energiaActual}/${ENERGIA_MAXIMA}`);

for (let dia = 1; dia <= 7; dia++) {
    console.log("");
    console.log(`--- DÍA ${dia} ---`);

    // Si algún recurso se ha agotado, la simulación termina.
    if (aguaDisponible <= 0) {
        console.log("Has muerto por deshidratación.");
        break;
    }
    if (comidaDisponible <= 0) {
        console.log("Has muerto de hambre.");
        break;
    }
    if (energiaActual <= 0) {
        console.log("Has muerto de agotamiento.");
        break;
    }

    console.log("Despiertas al amanecer. Otro día por delante...");

    // Buscar agua si quedan menos de 3 litros.
    if (aguaDisponible < 3) {
        let aguaEncontrada: boolean = false;
        while (!aguaEncontrada && energiaActual >= ENERGIA_BUSCAR_AGUA) {
            energiaActual -= ENERGIA_BUSCAR_AGUA;
            if (Math.random() < PROBABILIDAD_ENCONTRAR_AGUA) {
                // De 2 a 5 litros: 4 valores posibles, empezando en 2.
                let litros: number = Math.floor(Math.random() * 4) + 2;
                aguaDisponible += litros;
                aguaEncontrada = true;
                console.log(`Encuentras ${litros} litros de agua.`);
            } else {
                console.log("Buscas agua sin suerte.");
            }
        }
    } else {
        console.log(
            `Tienes suficiente agua (${aguaDisponible} litros). ` +
            "No necesitas buscar."
        );
    }

    // Buscar comida si quedan menos de 2 raciones.
    if (comidaDisponible < 2) {
        let comidaEncontrada: boolean = false;
        while (!comidaEncontrada && energiaActual >= ENERGIA_BUSCAR_COMIDA) {
            energiaActual -= ENERGIA_BUSCAR_COMIDA;
            if (Math.random() < PROBABILIDAD_ENCONTRAR_COMIDA) {
                // De 1 a 3 raciones: 3 valores posibles, empezando en 1.
                let raciones: number = Math.floor(Math.random() * 3) + 1;
                comidaDisponible += raciones;
                comidaEncontrada = true;
                console.log(`Encuentras ${raciones} raciones de comida.`);
            } else {
                console.log("Buscas comida sin suerte.");
            }
        }
    } else {
        console.log(
            `Tienes suficiente comida (${comidaDisponible} raciones). ` +
            "No necesitas buscar."
        );
    }

    // Descansar: entre 20 y 30 puntos, sin pasar del máximo.
    console.log("Es hora de descansar y recuperar energías...");
    let energiaAntes: number = energiaActual;
    energiaActual += Math.floor(Math.random() * 11) + ENERGIA_DESCANSO_MINIMA;
    if (energiaActual > ENERGIA_MAXIMA) {
        energiaActual = ENERGIA_MAXIMA;
    }
    let energiaRecuperada: number = energiaActual - energiaAntes;
    console.log(`Recuperaste ${energiaRecuperada} puntos de energía`);

    // Consumo al final del día.
    console.log("Al final del día, consumes tus recursos diarios...");
    aguaDisponible -= AGUA_CONSUMO_DIARIO;
    comidaDisponible -= COMIDA_CONSUMO_DIARIO;
    energiaActual -= ENERGIA_CONSUMO_DIARIO;

    console.log(`Estado al final del día ${dia}:`);
    console.log(`  - Agua: ${aguaDisponible} litros`);
    console.log(`  - Comida: ${comidaDisponible} raciones`);
    console.log(`  - Energía: ${energiaActual}/${ENERGIA_MAXIMA}`);

    diasSobrevividos++;
}

console.log("");
console.log("=== FIN DE LA SIMULACIÓN ===");
if (diasSobrevividos === 7) {
    console.log("Has aguantado los 7 días. El convoy de rescate te recoge.");
} else {
    console.log(`Has sobrevivido ${diasSobrevividos} días de 7.`);
}
