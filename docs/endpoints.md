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

#### /available/genre/:genre

Consulta los mangas disponibles de género `genre`.

Ejemplo:

~~~~bash
$ curl http://localhost:8000/available/genre/Action
~~~~

#### /available/status/:staus

Consulta los mangas disponibles con status `status`.

Ejemplo:

~~~~bash
$ curl http://localhost:8000/available/status/ongoing
~~~~

Para ver el resultado de los ejemplos como JSON leíble, añade `| python -mjson.tool` al final de cada comando.