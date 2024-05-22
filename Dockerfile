FROM node:20-alpine AS base


FROM base AS dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm instal
FROM base AS build

WORKDIR /app

COPY . .
COPY .env .env

COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run  build

FROM base AS deploy

WORKDIR /app
COPY --from=build /app/dist/ ./dist/
COPY --from=build /app/node_modules ./node_modules

CMD [ "node", "dist/main.js" ]

