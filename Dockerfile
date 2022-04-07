FROM denoland/deno:1.10.3

EXPOSE 1993

WORKDIR /app

USER deno

COPY deps.ts .
RUN deno cache deps.ts

ADD . .
RUN deno cache main.ts

CMD ["run", "--allow-net", "--allow-env", "./src/mod.ts"]