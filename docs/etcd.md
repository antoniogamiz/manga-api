## Middleware

Como logger simplemente he añadido un [middleware](https://github.com/antoniogamiz/manga-api/blob/master/src/infraestructure/api/middleware/logger.middleware.ts) que muestra por la terminal información básica sobre la petición que se recibe:

~~~typescript
import { Context } from "../../../deps.ts";
import { log } from "../../../deps.ts";

const loggerMidleware = (ctx: Context) => {
  const { request, response } = ctx;
  log.info(`${request.method} ${response.status} ${request.url}`);
};

export { loggerMidleware };

~~~

También tengo un [middleware](https://github.com/antoniogamiz/manga-api/blob/master/src/infraestructure/api/middleware/error.middleware.ts) para manejar errores.

## Configuración distribuida

Antes de crear la configuración distribuida, he creado un objeto común de settings que usará la aplicación en general:

~~~typescript
type Settings = {
  PORT: number;
  MANGA_URL: string;
  API_ROOT: string;
};
~~~

En local y en los tests se usarán la configuración a partir de variables de entorno o los valores por defecto (en ese orden).

~~~~typescript
export default {
  PORT: env.PORT || 8000,
  MANGA_URL: env.MANGA_URL || "https://manganelo.com/",
  API_ROOT: env.API_ROOT || "",
};
~~~~

En la versión de producción, es decir, [index.ts](https://github.com/antoniogamiz/manga-api/blob/master/index.ts), compruebo la existencai de etcd, y en caso de que esté, leo las variables:

~~~typescript
if (await isEtcdAvailable()) {
  settings = await getConfigFromLocalEtcdInstance();
}
~~~