# Manga API

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Documentation](https://github.com/antoniogamiz/manga-api/workflows/Documentation/badge.svg)
![Tests CI](https://github.com/antoniogamiz/manga-api/workflows/Tests/badge.svg)

## Descripción

Pequeña API para consultar información relativas a mangas tales como autores, género, capítulos y obtener enlaces a las correspondientes imágenes de cada capítulo. Este API pretende ser usada por aplicaciones móviles o páginas web para *leer* manga.

Para obtener la información de cada manga, dependemos de páginas externas como [manganelo](https://manganelo.com/). Cada página debe tener una implementación del [parser](https://github.com/antoniogamiz/manga-api/blob/master/src/types/parser.ts) asociada. Por ahora, solo el [parser de Manganelo](https://github.com/antoniogamiz/manga-api/blob/master/src/parsers/manganelo.ts) es completamente funcional. Los diferentes parsers son usados por la API cuando una nueva petición llega.

Para correr la aplicación:

    vr start

Para ejecutar los tests:

    vr test

Para ejecutar el linter:

    vr lint

Para correr el servidor en modo desarrollo (con `watch` activado):

    vr dev

El módulo todavía no cuenta con un instalador, por lo que si quieres usar el proyecto tendrás que descargarte el repositorio con el siguiente comando:

~~~bash
git clone https://github.com/antoniogamiz/manga-api
~~~

Nota: necesitas tener instalado [velociraptor](https://github.com/umbopepato/velociraptor).

## Endpoints

La API tiene varios endpoints disponibles:

#### /mangas/:id

Consulta un manga dada una `id`.

Ejemplo:

~~~~bash
$ curl http://localhost:8000/mangas/read_one_piece_manga_online_free4
~~~~

#### /mangas/:mangaId/:chapterId

Consulta el capítulo de un manga dados el id del manga (`mangaId`) y el id del capítulo (`chapterId`).

Ejemplo:

~~~~bash
$ curl http://localhost:8000/mangas/read_one_piece_manga_online_free4/chapter_1
~~~~

#### /available/:n

Consulta los mangas disponibles usando un índice de paginación (`n`).

Ejemplo:

~~~~bash
$ curl http://localhost:8000/available/28
~~~~

Para ver el resultado de los ejemplos como JSON leíble, añade `| python -mjson.tool` al final de cada comando.

## Docker

He creado un contenedor de Docker que contiene Deno y las dependencias necesarias para ejecutar los tests y la aplicación (como Velociraptor, por ejemplo). El Dockerfile usado puede ser consultado [aquí](./Dockerfile).

Para descargarte la imagen y ejecutar los tests (después de haberse descargado el repositorio), puedes ejecutar:

    docker pull antoniogamiz/manga-api
    docker run -t -v `pwd`:/test

Como imagen base usamos una versión mantenida por la comunidad, el por qué puede ser consultado [aquí](https://github.com/antoniogamiz/manga-api/blob/master/docs/herramientas.md#docker).

El contenedor también se encuentra disponible en el [registro de GitHub](https://github.com/users/antoniogamiz/packages/container/package/manga-api). Puedes descargártelo con el siguiente comando:

    docker pull ghcr.io/antoniogamiz/manga-api:latest

También puedes ver cómo y por qué publicamos en dos registros distintos [aquí](docs/build.md).

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

*NOTA*: Actualmente está rota porque TypeDoc tiene bastantes problemas con la forma de importar tipos de Deno. Estoy intentando solucionarlo o buscar una alternativa (hay pocas tirando a ninguna).

### Historias de usuario:

Los cambios aparecen descritos en el [CHANGELOG](docs/CHANGELOG.md) del proyecto.

- [ ] [HU1: Consultar mangas disponibles](https://github.com/antoniogamiz/manga-api/issues/9)
- [ ] [HU2: Consultar manga específico](https://github.com/antoniogamiz/manga-api/issues/10)
- [ ] [HU3: consultar manga por criterios](https://github.com/antoniogamiz/manga-api/issues/11)
- [ ] [HU4: consultar capítulo de un manga](https://github.com/antoniogamiz/manga-api/issues/12)


### Enlaces de interés

 - [Justificación](/docs/herramientas.md) de las herramientas usadas.
 - [Comprobación](/docs/git.md) de `git` configurado correctamente.

## Autor

- [Antonio Gámiz Delgado](https://github.com/antoniogamiz)