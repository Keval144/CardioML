# --- STAGE 1: Dependency Installation & Build (deps) ---
FROM oven/bun:1 AS deps

WORKDIR /app

# Copy package files
# Ensure you have 'bun.lock' (text format) generated locally before building
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
# For Next.js, this creates the '.next' folder
RUN bun run build


# --- STAGE 2: Production Runner (runner) ---
FROM oven/bun:1-slim AS runner

ENV NODE_ENV=production
WORKDIR /app

# 1. Copy package.json (Required to run the start script)
COPY --from=deps /app/package.json ./package.json

# 2. Copy the public folder (Required for static images/icons)
# If you don't have a public folder, you can comment this out
COPY --from=deps /app/public ./public

# 3. Copy the .next build folder (The specific fix)
# Next.js builds to '.next', not 'dist'
COPY --from=deps /app/.next ./.next

# 4. Copy node_modules (Required for runtime dependencies)
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000

# Start the app
CMD ["bun", "run", "start"]