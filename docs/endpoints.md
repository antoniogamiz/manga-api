## Endpoints

La API tiene varios endpoints disponibles:

#### /manga/:id

Consulta un manga dada su identificación.

~~~~bash
GET /manga/:id
~~~~

Parámetros:

- `mangadId`: identificador de un manga.

Devuelve:

- `OK`: [ChapterEntity](https://github.com/antoniogamiz/manga-api/blob/master/src/parsers/entities/MangaEntity.ts)
- `BAD_REQUEST`: si el identificador es incorrecto.


Historia de usuario: [H2](https://github.com/antoniogamiz/manga-api/issues/10)

#### /manga/:mangaId/:chapterId

Consulta el capítulo de un manga dados el id del manga (`mangaId`) y el id del capítulo (`chapterId`).

~~~~bash
GET /manga/:mangaId/:chapterId
~~~~

Parámetros:

- `mangadId`: identificador de un manga.
- `chapterId`: identificador de un capítulo.

Devuelve:

- `OK`: [ChapterEntity](https://github.com/antoniogamiz/manga-api/blob/master/src/parsers/entities/ChapterEntity.ts)
- `NOT_FOUND`: si alguno de los indentificadores es incorrecto.

Historia de usuario: [H4](https://github.com/antoniogamiz/manga-api/issues/12)

#### /manga/?genre=<genre>&status=<status>

Consulta los manga disponibles por criterios (`status` o `genre`).

~~~~bash
GET /manga/?genre=<genre>&status=<status>
~~~~

Parámetros:

- `genre`: cualquiera de la siguiente [lista](https://github.com/antoniogamiz/manga-api/blob/master/src/parsers/enums/Genre.ts).
- `status`: cualquiera de la siguiente [lista](https://github.com/antoniogamiz/manga-api/blob/master/src/parsers/enums/Status.ts).

Ambos parámetros son opcionales. En caso de faltar ambos, no se tendrá en cuenta ningún filtro por género ni por status.

Devuelve:

- `OK`: array de [MangaListEntryEntity[]](https://github.com/antoniogamiz/manga-api/blob/master/src/parsers/entities/MangaByResponse.ts).
- `BAD_REQUEST`: si la entrada no es válida.


Historias de usuario:

- [H1](https://github.com/antoniogamiz/manga-api/issues/9)
- [H3](https://github.com/antoniogamiz/manga-api/issues/11)
