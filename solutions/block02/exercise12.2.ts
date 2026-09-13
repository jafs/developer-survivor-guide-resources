// Ejercicio 12.2: Clasificador de amenazas zombis.

enum TipoZombi {
    CAMINANTE = "caminante",
    VELOCISTA = "velocista",
    MUTANTE = "mutante",
}

const descripcionesZombis: Map<TipoZombi, string> = new Map([
    [TipoZombi.CAMINANTE, "Se mueve despacio, muy fuerte"],
    [TipoZombi.VELOCISTA, "Tiene gran velocidad, fuerza similar a la humana"],
    [TipoZombi.MUTANTE, "Velocidad variable, demasiado fuerte"],
]);

function identificarAmenaza(tipo: TipoZombi): string {
    return descripcionesZombis.get(tipo) ?? "Amenaza sin clasificar";
}

console.log("=== CLASIFICADOR DE AMENAZAS ZOMBIS ===");
console.log("Sistema de identificación para patrullas defensivas");

console.log(`Caminante: ${identificarAmenaza(TipoZombi.CAMINANTE)}`);
console.log(`Velocista: ${identificarAmenaza(TipoZombi.VELOCISTA)}`);
console.log(`Mutante: ${identificarAmenaza(TipoZombi.MUTANTE)}`);

// Avistamiento que una patrulla envía por radio.
const avistamiento = {
    tipo: TipoZombi.VELOCISTA,
    descripcion: identificarAmenaza(TipoZombi.VELOCISTA),
    zona: "puerta norte",
};
const mensajeRadio = JSON.stringify(avistamiento);
console.log(`\nEnviando por radio: ${mensajeRadio}`);

// Otra patrulla recibe el mensaje. JSON.parse() devuelve any, así que se
// indica la forma que esperamos.
const avistamientoRecibido: { zona: string } = JSON.parse(mensajeRadio);
console.log(`Avistamiento recibido en: ${avistamientoRecibido.zona}`);
