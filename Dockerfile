FROM hayd/alpine-deno:1.4.6

EXPOSE 8000

WORKDIR /app

USER root
RUN deno install -qA -n vr https://deno.land/x/velociraptor@1.0.0-beta.15/cli.ts

USER deno
COPY src/deps.ts .
RUN deno cache deps.ts
ADD . .
RUN deno cache index.ts

CMD vr start