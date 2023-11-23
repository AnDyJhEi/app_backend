FROM node:18-alpine as deps
WORKDIR /app


COPY package.json ./
RUN yar install --frozen-lockfile

FROM node:18-alpine as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .
RUN yarn build


FROM node:18-alpine as runner
WORKDIR /app

COPY package.json ./
RUN yarn install --prod
COPY --from=builder /app/src ./src

CMD [ "node","src/main" ]