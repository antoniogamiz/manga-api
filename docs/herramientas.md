## Tech Stack

### Lenguage

Se ha elegido [Typescript](https://www.typescriptlang.org/) como lenguaje de programación, ya que este lenguaje tiene muy buen soporte para operaciones asíncronas, tiene un ecosistema enorme y se puede hacer scraping de forma cómoda.

Para la documentación voy a usar [tsdoc](https://github.com/microsoft/tsdoc),
el estándar open source de Microsoft para Typescript. Esto tiene varias ventajas:

- Es soportado de forma nativa por Visual Studio Code, luego conseguiré una mejora en la autocompletación.
- Al ser un estándar oficial, se integra perfectamente con [Typedoc](https://github.com/TypeStrong/typedoc), que es la utilidad que voy a usar para generar una versión web de la documentación.

Usar `TypeDoc` puede dar problemas con Deno debido a la resolución de módulos, por eso es importante añadir la opción `--ignoreCompilerErrors`, que puede parecer mala práctica pero es la única alternativa. Para evitar tener errores sintácticas en el código, se puede usar `deno lint`.

En este [artículo](https://blog.cloudflare.com/generating-documentation-for-typescript-projects/), Cloudfare explica de forma bastante clara por qué evitar usar JSDoc si ya usas Typescript.

Como runtime de Typescript, uso [deno](https://deno.land/) porque tiene soporte **nativo** para Typescript. Sólo por esa característica ya lo hace una alternativa superior a Node donde necesitas unos cuantos paquetes para simplemente ejecutar tu código.

### Task Runner

He optado por [velociraptor](https://deno.land/x/velociraptor@1.0.0-beta.14) porque tiene un formato simple e intuitivo, te permite usar yaml, json o incluso un archivo en TypeScript. Dentro de las pocas opciones disponibles para Deno actualmente, es bastante conocido y tiene muchísimas opciones de configuración para modificar lo que necesites. Además el nombre mola.

Además tiene dos ventajas adicionales:

- Como soporta el formato YAML, no tengo que aprender otro formato diferente porque es el que se usa, por ejemplo en las acciones de GitHub.
- En Deno, tienes que especificar varios permisos específicos de cada acción que quieres realizar, con `velociraptor` puedes ahorrarte esta lista de permisos con la directiva `allow`.

    ~~~yaml
    allow:
        - net

    scripts:
        start:
            desc: Run the app
            cmd: deno run src/app.ts
        test:
            desc: Run the tests
            cmd: deno test
        lint:
            desc: Linter
            cmd: deno lint --unstable
    ~~~

### Test runner

Para correr los tests he optado por usar el propio runner de Deno, `deno test`. Como librería de aserciones también voy a usar [la oficial de Deno](https://deno.land/std@0.74.0/testing/). No necesita una externa porque esta incluye muchas de las características de Jest, Mocha y similares, ya que está pensada precisamente para eso.

De hecho, como se ve en el siguiente ejemplo, la sintaxis es prácticamente idéntica a la de Jest:

~~~ts
Deno.test("Get chapter title", async () => {
  const html: string = await fetchPage(spec.mangas[0].chapters[0].url);
  const chapter: Chapter = parser.parseChapter(html);
  assertEquals(chapter.title, spec.mangas[0].chapters[0].title);
});

~~~

### Middleware framework

Como middleware framework he usado [Oak](https://github.com/oakserver/oak). Dentro del ecosistema de Deno, es uno de los más avanzados y es el equivalente a [Koa](https://github.com/koajs/koa/) en NodeJS. Además está escrito por parte del equipo que escribío [ExpressJS](https://expressjs.com/es/).

Voy a usar un middleware framework para mi API porque me proporciona muchas ventajas para un buen diseño de la API:

- Añadir un logger común para todas las peticiones.
- Descomponer mis endpoints en diferentes archivos de forma comprensiva.
- Capturas los diferentes errores que se puedan producir con handlers específicos.
- Trabajar de forma fácil con query parameters y similares.

Deno provee sus propias implementación de un servidor [HTTP](https://deno.land/std@0.74.0/http), pero las funcionalidad que exporta es de más bajo nivel que la de Oak.

También hay alternativas a Oak, como por ejemplo [Abc](https://deno.land/x/abc@v1.1.0), pero con una documentación y comunidad bastante más pobre que la de Oak.

### Testear el servidor

Para testear el servidor voy a usar dos librerías:

- [SuperDeno](https://github.com/asos-craigmorten/superdeno): que facilita las aserciones sobre operaciones HTTP usando [superagent](https://github.com/visionmedia/superagent).
- [SuperOak](https://github.com/asos-craigmorten/superoak): es un wrapper de SuperDeno añadiendo funcionalidad para Oak.

Uso estas librerías para evitar repetir código en los tests (como preparar el servidor, hacer las peticiones, etc). Gracias a estas librerías los tests quedan mucho más legibles:

~~~
Deno.test("it should support the Oak framework", async () => {
  const request = await superoak(app);
  await request.get("/").expect("Hello Deno!");
});
~~~