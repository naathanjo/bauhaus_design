---
layout: post.njk
title: Docker for Frontend Developers
description: A practical guide to using Docker for local development and deployment of static sites and frontend applications.
date: 2023-12-15
tags:
  - blog
  - docker
  - devops
  - deployment
author: Your Name
image: /images/placeholders/blog-docker.svg
imageAlt: Geometric illustration representing Docker containerization with three colored squares connected by lines, symbolizing container orchestration
---

Docker has become an essential tool for modern web development. Here's how to use it effectively for frontend projects.

## Why Docker for Frontend?

You might think Docker is only for backend developers, but it offers significant advantages for frontend work:

- **Consistent environments**: Same setup across team members
- **Isolated dependencies**: No more "works on my machine"
- **Easy deployment**: Build once, deploy anywhere
- **Production parity**: Dev environment matches production

## Basic Concepts

### Images vs Containers

- **Image**: A blueprint for your application
- **Container**: A running instance of an image

Think of it like a class (image) and an instance (container) in programming.

### Dockerfile

A Dockerfile defines how to build your image:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
```

### Multi-Stage Builds

For production, use multi-stage builds to keep images small:

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine
COPY --from=builder /app/_site /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

**Benefits:**
- Final image only contains built files
- No dev dependencies in production
- Smaller, more secure images

## Docker Compose

For complex setups, use docker-compose.yml:

```yaml
version: '3.8'
services:
  dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "8080:8080"
    volumes:
      - ./src:/app/src
    environment:
      - NODE_ENV=development

  prod:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
```

Run with:
```bash
docker-compose up dev    # Development
docker-compose up prod   # Production
```

## Best Practices

### 1. Use .dockerignore

Prevent unnecessary files from being copied:

```
node_modules
_site
.git
.env
*.log
```

### 2. Layer Caching

Order Dockerfile commands to maximize cache hits:

```dockerfile
# Do this (dependencies change less often)
COPY package*.json ./
RUN npm install
COPY . .

# Not this (invalidates cache on every code change)
COPY . .
RUN npm install
```

### 3. Specific Base Images

Use specific versions, not `latest`:

```dockerfile
# Good
FROM node:20.10.0-alpine

# Bad
FROM node:latest
```

### 4. Health Checks

Add health checks for production:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1
```

## Development Workflow

### Hot Reload

Mount your source as a volume for hot reload:

```yaml
volumes:
  - ./src:/app/src
  - /app/node_modules  # Prevent overwriting
```

### Makefile for Convenience

Create a Makefile for common commands:

```makefile
dev:
	docker-compose up dev

build:
	docker-compose build

clean:
	docker-compose down -v
	docker system prune -f
```

Usage:
```bash
make dev    # Start development
make clean  # Clean up
```

## Deployment

### Build for Production

```bash
docker build -t my-site:latest .
```

### Push to Registry

```bash
docker tag my-site:latest registry.example.com/my-site:latest
docker push registry.example.com/my-site:latest
```

### Deploy

Use Docker on your server or services like:
- AWS ECS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

## Real-World Example

For this portfolio, I use:

1. **Dockerfile.dev**: Node.js with hot reload for development
2. **Dockerfile**: Multi-stage build with Nginx for production
3. **docker-compose.yml**: Profiles for dev and prod
4. **Makefile**: Simple commands like `make dev` and `make prod`

The result? Consistent environments from development through production, with zero "it works on my machine" issues.

## Common Pitfalls

### File Permissions

On Linux, files created in containers might have wrong permissions:

```dockerfile
# Solution: Match user ID
RUN adduser -D -u 1000 appuser
USER appuser
```

### Volume Mounts on Windows

Windows paths need special handling:

```yaml
volumes:
  - type: bind
    source: ./src
    target: /app/src
```

### Large Images

Keep production images small:
- Use Alpine base images
- Multi-stage builds
- .dockerignore
- Only copy necessary files

## Conclusion

Docker isn't just for backend—it's a powerful tool for frontend developers that provides:
- Consistent development environments
- Easy collaboration
- Simplified deployment
- Production parity

Start simple with a basic Dockerfile, then add complexity as needed. The investment in learning Docker pays off quickly in reduced debugging time and deployment confidence.
