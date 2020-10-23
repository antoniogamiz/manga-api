FROM hayd/alpine-deno:1.0.0

EXPOSE 8000

WORKDIR /app

USER deno

RUN deno install -qA -n vr https://deno.land/x/velociraptor@1.0.0-beta.15/cli.ts

COPY src/deps.ts .
RUN deno cache deps.ts
ADD . .
RUN deno cache index.ts

CMD vr start