# Manga API

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Documentation](https://github.com/antoniogamiz/manga-api/workflows/Documentation/badge.svg)
![Tests CI](https://github.com/antoniogamiz/manga-api/workflows/Tests/badge.svg)

## Descripción

Pequeña API para consultar información relativas a mangas tales como autores, género, capítulos y obtener enlaces a las correspondientes imágenes de cada capítulo. Este API pretende ser usada por aplicaciones móviles o páginas web para *leer* manga, como [manganelo](https://manganelo.com/).


Para correr la aplicación:

    vr start

Para ejecutar los tests:

    vr test

Para ejecutar el linter:

    vr lint

Nota: necesitas tener instalado [velociraptor](https://github.com/umbopepato/velociraptor).

## Documentación


- [GH Pages](https://antoniogamiz.github.io/manga-api/)
- Lenguaje: [Typescript](https://www.typescriptlang.org/)
- Runtime: [Deno](https://deno.land/)
- [Plan de desarrollo](/docs/plan.md)
- [iv.yaml](/iv.yaml)
- Principales tipos:
    - [Relacionados con manga](/src/types/manga.ts)
    - [Relacionados con parsers](/src/types/parser.ts)


La documentación sigue el estándar [tsdoc](https://github.com/microsoft/tsdoc) y es generada usando [typedoc](https://github.com/TypeStrong/typedoc).

### Historias de usuario:

- [ ] [HU1: Consultar mangas disponibles](https://github.com/antoniogamiz/manga-api/issues/9)
- [ ] [HU2: Consultar manga específico](https://github.com/antoniogamiz/manga-api/issues/10)
- [ ] [HU3: consultar manga por criterios](https://github.com/antoniogamiz/manga-api/issues/11)
- [ ] [HU4: consultar capítulo de un manga](https://github.com/antoniogamiz/manga-api/issues/12)


### Enlaces de interés

 - [Justificación](/docs/herramientas.md) de las herramientas usadas.
 - [Comprobación](/docs/git.md) de `git` configurado correctamente.

## Autor

- [Antonio Gámiz Delgado](https://github.com/antoniogamiz)