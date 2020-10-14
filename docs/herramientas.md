## Justificación de herramientas

- Se ha elegido [Typescript](https://www.typescriptlang.org/) como lenguaje de programación, ya que este lenguaje tiene muy buen soporte para operaciones asíncronas, tiene un ecosistema enorme y se puede hacer scraping de forma cómoda.

Para la documentación voy a usar [tsdoc](https://github.com/microsoft/tsdoc),
el estándar open source de Microsoft para Typescript. Esto tiene varias ventajas:

- Es soportado de forma nativa por Visual Studio Code, luego conseguiré una mejora en la autocompletación.
- Al ser un estándar oficial, se integra perfectamente con [Typedoc](https://github.com/TypeStrong/typedoc), que es la utilidad que voy a usar para generar una versión web de la documentación.

En este [artículo](https://blog.cloudflare.com/generating-documentation-for-typescript-projects/), Cloudfare explica de forma bastante clara por el que evitar usar JSDoc si ya usas Typescript.

- Uso [deno](https://deno.land/) como runtime porque tiene soporte **nativo** para Typescript. Sólo por esa característica ya lo hace una alternativa superior a Node donde necesitas unos cuantos paquetes para simplemente ejecutar tu código.

- Uso [velociraptor](https://deno.land/x/velociraptor@1.0.0-beta.14) porque tiene un formato simple e intuitivo, te permite usar yaml, json o incluso un archivo en TypeScript. Dentro de las pocas opciones disponibles para Deno actualmente, es bastante conocido y tiene muchísimas opciones de configuración para modificar lo que necesites. Además el nombre mola.