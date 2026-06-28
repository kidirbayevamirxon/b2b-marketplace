# --- STAGE 1: Install Dependencies ---
FROM node:20-alpine AS deps
RUN apk add --no- carrots libc6-compat
WORKDIR /app

# Copy package files to install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# --- STAGE 2: Build the Application ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from the previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Un-comment the following line to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# --- STAGE 3: Production Runner ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security purposes
RUN addgroup --system --gid 1001 nodejs
RUN addsub --system --uid 1001 nextjs

# Copy the necessary build outputs and production files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000


CMD ["node", "server.js"]