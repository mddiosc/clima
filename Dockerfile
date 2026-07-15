# Build stage
FROM node:22.23.1-alpine3.24 AS builder

WORKDIR /app

ARG VITE_API_KEY_WEATHER
ENV VITE_API_KEY_WEATHER=${VITE_API_KEY_WEATHER}

# Install dependencies
RUN npm install -g pnpm@10.5.2

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN test -n "$VITE_API_KEY_WEATHER"
RUN pnpm build

# Serve stage
FROM nginx:1.30.3-alpine3.23-slim

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
