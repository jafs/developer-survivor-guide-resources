# Soluciones de la Guía de Programación en un Apocalipsis Zombi

Aquí tienes las soluciones de todos los ejercicios y desafíos de la segunda edición de la *Guía de Programación en un Apocalipsis Zombi*.

Más información sobre el libro en su web: <https://jafs.github.io/books/programacion-zombi.html>

## Antes de mirar una solución

Intenta cada ejercicio primero, aunque te atasques. Si después de pelearte un rato no sale, mira la solución, ciérrala y vuelve a escribir el código tú desde cero.

Tu solución no tiene por qué ser igual que la de este repositorio. Si hace lo que pide el enunciado, es válida.

## Estructura

```text
solutions/
├── block01/              Capítulos 1 a 6 y desafío 1
│   ├── exercise1.1.ts    Ejercicio 1.1
│   ├── ...
│   └── challenge1.ts     Desafío 1
├── block02/              Capítulos 7 a 12 y desafío 2
├── block03/              Capítulos 13 a 18 y desafío 3
├── block04/              Capítulos 19 a 21 y desafío 4
├── exercise-runner.ts    Ejecutor de soluciones
├── package.json
└── tsconfig.json
```

Cada solución es un archivo independiente: puedes abrirlo, leerlo y ejecutarlo por separado.

## Soluciones con tests

Las soluciones de los ejercicios 21.1, 21.2 y 21.3 y la del desafío 4 llevan tests en el mismo archivo, escritos con `node:test`. Con Deno, `deno test` comprueba los tipos y ejecuta los tests:

```bash
deno test block04/exercise21.1.ts
```

Con Node.js, usa `node --test block04/exercise21.1.ts`. `deno run` no ejecuta los tests, así que en el desafío 4 sirve para ver solo la noche: `deno run block04/challenge4.ts`.

## Ejecutar una solución con Deno (recomendado)

Es la forma que usa el libro. Con [Deno](https://deno.com) instalado, no necesitas nada más:

```bash
deno run block02/exercise7.1.ts
```

`deno run` no comprueba los tipos. Para comprobarlos, usa `deno check`:

```bash
deno check block02/exercise7.1.ts
```

## Ejecutar una solución con Node.js

Necesitas [Node.js](https://nodejs.org) 22 o posterior. Instala las dependencias una vez, desde esta carpeta:

```bash
npm install
```

Después puedes usar el ejecutor de soluciones:

```bash
npm start                 # Modo interactivo: escribe 7.1, desafio2 o lista.
npm start -- 7.1          # Ejecuta el ejercicio 7.1.
npm start -- desafio2     # Ejecuta el desafío 2.
npm run comprobar         # Comprueba los tipos de todas las soluciones.
```

Las versiones recientes de Node.js pueden ejecutar TypeScript directamente con `node block01/exercise1.1.ts`, pero no admiten `enum`, que usan algunas soluciones. Por eso el ejecutor usa [tsx](https://tsx.is).
