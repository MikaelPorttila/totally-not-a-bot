FROM denoland/deno

EXPOSE 1993

WORKDIR /app

USER deno

COPY deps.ts .
RUN deno cache deps.ts

ADD . .
RUN deno cache ./src/mod.ts

CMD ["run", "--allow-net", "--allow-env", "./src/mod.ts"]