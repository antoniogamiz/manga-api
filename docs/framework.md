# Elección de framework

En Deno hay varias alternativas a la hora de elegir un framework de routing, pero no todas son adecuadas para mi API. Los requerimientos de mi API son los siguientes:

- Manejo de routas de forma _descentralizada_, es decir, poder definirlas en ficheros independientes y luego _juntarlas_ en un fichero general.
- Soporte para middleware: feature clave para poder crear un logger de forma sencilla y manejar errores inesperados.
- Que se pueda testear sin tener que levantar el servicio de forma independiente.

Esas son las principales cosas que necesito, así juzgaré las opciones disponibles en función de ellas:

- [Opine](https://github.com/asos-craigmorten/opine/tree/main): es un proyecto joven que está en pleno desarollo. Su objetivo es parecerse a ExpressJS, luego en principio, debería cumplir los requerimientos, el problema es que todavía es una versión muy temprana (`0.27.0`) y no tiene un buen soporte para middleware. Aunque sí es compatible con `superdeno`, librería para testear servidores HTTP.

- [Servest](https://github.com/keroxp/servest): este es el segundo más famoso después de `Oak`. Cumple con casi todos los requerimientos, excepto por la posibilidad de testearlo de forma independiente. Además, su escasa documentación y ejemplos deja mucho que desear.

- [Oak](https://github.com/oakserver/oak): es básicamente el port de [Koa](https://koajs.com/) para Deno. Cumple con todos los requerimientos de sobra y además tiene una comunidad mucho más activa que los demás, luego si me surge algún problema es mucho más probable que se solucione rápido.

En este [artículo](https://dev.to/craigmorten/what-is-the-best-deno-web-framework-2k69), se pueden encontrar más frameworks que no he considerado.