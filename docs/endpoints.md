## Diseño por capas

Para cumplir con este ítem he tenido que refactorizar mi aplicación para usar la arquitecture conocida como **Clean Architecture**. Todavía soy inexperto en este tema así que no está demasiado del todo bien implementada. Lo que he hecho es separar la lógica a partir de las historias de usuario:

- [Entidades](https://github.com/antoniogamiz/manga-api/tree/master/src/parsers/entities): lógica de negocio, no dependen de nada.
- [Casos de uso](https://github.com/antoniogamiz/manga-api/tree/master/src/parsers/use-cases): lógica de negocio, dependen de las entidades.
- [Controladores](https://github.com/antoniogamiz/manga-api/tree/master/src/parsers/controllers): dependen de los casos de uso y pueden ser usados por la `API`, el bot de telegram, etc.
- [Repositorios](https://github.com/antoniogamiz/manga-api/tree/master/src/parsers/repositories): acceder a datos.
- [Infraestructura](https://github.com/antoniogamiz/manga-api/tree/master/src/infraestructure): esta es la única capa que contiene dependencias con el framework elegido. Por lo tanto, si hay que cambiar de framework, se puede hacer de forma sencilla y rápida.

Además de implementar esta arquitectura, he aplicado las siguientes buenas prácticas:

- SOLID: he creado [interfaces](https://github.com/antoniogamiz/manga-api/tree/master/src/parsers/interfaces) abstractas de las que dependen los casos de uso, controladores y repositorios.
- Inversión de control: ninguno de los objetos mencionados anteriormente crea sus dependencias, lo único que saben sobre ellas es la interfaz que implementan. Para conseguir esto, he creado un [ObjectFactory](ttps://github.com/antoniogamiz/manga-api/tree/master/src/modules/common/factories/ObjectFactory.ts) que se encarga de inicializar las dependencias cuando es necesario.

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
- `BAD_REQUEST`: si alguno de los indentificadores es incorrecto.

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
