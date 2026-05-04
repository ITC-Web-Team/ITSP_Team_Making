# syntax=docker/dockerfile:1

FROM node:20.19-bullseye-slim AS deps
WORKDIR /app

RUN apt-get update \
	&& apt-get install -y --no-install-recommends openssl ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

COPY itsp_team_making/package.json itsp_team_making/package-lock.json ./
RUN npm install --no-audit --no-fund

FROM node:20.19-bullseye-slim AS builder
WORKDIR /app

RUN apt-get update \
	&& apt-get install -y --no-install-recommends openssl ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY itsp_team_making/ .
COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts

RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npm run build

FROM node:20.19-bullseye-slim AS runner
WORKDIR /app

RUN apt-get update \
	&& apt-get install -y --no-install-recommends openssl ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV PORT=4736

# Copy everything needed
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 4736

CMD ["sh", "-c", "npx prisma migrate deploy --schema=/app/prisma/schema.prisma && npm start"]