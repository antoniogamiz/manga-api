## Endpoints

La API tiene varios endpoints disponibles:

#### /manga/:id

Consulta un manga dada una `id`.

Ejemplo:

~~~~bash
$ curl http://localhost:8000/manga/read_one_piece_manga_online_free4
~~~~

#### /manga/:mangaId/:chapterId

Consulta el capítulo de un manga dados el id del manga (`mangaId`) y el id del capítulo (`chapterId`).

Ejemplo:

~~~~bash
$ curl http://localhost:8000/manga/read_one_piece_manga_online_free4/chapter_1
~~~~

#### /manga/?genre=<genre>&status=<status>

Consulta los manga disponibles por criterios (`status` o `genre`).

Ejemplo:

~~~~bash
$ curl http://localhost:8000/manga/?genre=action&status=completed
~~~~

Para ver el resultado de los ejemplos como JSON leíble, añade `| python -mjson.tool` al final de cada comando.