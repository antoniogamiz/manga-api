FROM hayd/alpine-deno:1.4.6

EXPOSE 8000

RUN chown -R deno /usr/local/bin

USER deno

WORKDIR /home/deno

RUN deno install -qA -n vr https://deno.land/x/velociraptor@1.0.0-beta.15/cli.ts
ADD src/deps.ts .
RUN deno cache deps.ts && rm deps.ts

WORKDIR /test

CMD ["vr", "test"]