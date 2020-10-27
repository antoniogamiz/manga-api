FROM hayd/alpine-deno:1.4.6

EXPOSE 8000

RUN mkdir /test && chown -R deno /test /usr/local/bin

USER deno

WORKDIR /test

RUN deno install -qA -n vr https://deno.land/x/velociraptor@1.0.0-beta.15/cli.ts
ADD src/deps.ts .
RUN deno cache deps.ts
RUN rm deps.ts

CMD ["vr", "test"]