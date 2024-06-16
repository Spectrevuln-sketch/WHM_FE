FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat

WORKDIR /app

COPY package.json ./
COPY package-lock.json* ./

FROM base as builder
WORKDIR /app
COPY . .
RUN npm install --global yarn
RUN yarn install
RUN yarn build

FROM base as prod
WORKDIR /app
ENV NODE_ENV=production
RUN npm run ci
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

RUN npm install --global yarn
RUN yarn install

CMD ["yarn", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN yarn install
COPY . .
CMD ["yarn", "dev"]