FROM hayd/alpine-deno:1.4.6

EXPOSE 8000

# aqui se instalan los binarios de deno
RUN chown -R deno /usr/local/bin

# usuario sin privilegios definido en imagen base
USER deno

# directorio de nuestro usuario
WORKDIR /home/deno

# instalamos el task runner
RUN deno install -qA -n vr https://deno.land/x/velociraptor@1.0.0-beta.16/cli.ts

# cacheamos las dependencias
ADD src/deps.ts .
RUN deno cache deps.ts && rm deps.ts

# cambiamos al directorio donde se ejecutaran los tests
WORKDIR /test

# ejecutamos los tests
CMD ["vr", "test"]