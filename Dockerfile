FROM node:24.14.0-alpine

RUN --mount=type=cache,id=corepack,target=/root/.cache/node/corepack \
    corepack enable && corepack prepare pnpm@10.28.1 --activate

WORKDIR /app

COPY --chown=node:node src/package.json src/pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --ignore-scripts --frozen-lockfile

ENV PATH=/app/node_modules/.bin:$PATH

COPY src .

EXPOSE 6003

CMD ["pnpm", "run", "dev"]