# Docker & DevOps Best Practices Analysis

## Overview

The IS117 portfolio demonstrates production-ready containerization and DevOps practices that ensure reliable, scalable, and maintainable deployment workflows. This analysis extracts key patterns for implementation in modern web projects.

## Docker Architecture

### Multi-Stage Build Strategy

The project uses a sophisticated multi-stage Docker build that separates build concerns from runtime:

**Stage 1: Builder**

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files first (Docker layer caching)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build
```

**Stage 2: Production**

```dockerfile
FROM nginx:alpine AS production

# Custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets from builder stage
COPY --from=builder /app/_site /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Benefits of Multi-Stage Builds

1. **Smaller Production Images**: Build tools and source code not included in final image
2. **Security**: Reduced attack surface by excluding development dependencies
3. **Performance**: Faster deployment and reduced storage costs
4. **Separation of Concerns**: Clear distinction between build and runtime environments

## Docker Compose Configuration

### Profile-Based Environments

The project uses Docker Compose profiles for different environments:

```yaml
services:
  # Development service
  dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports: ["3000:8080"]
    volumes:
      - ./src:/app/src:cached
      - node_modules:/app/node_modules
    profiles: ["dev", "development"]
    environment:
      - NODE_ENV=development
      - CHOKIDAR_USEPOLLING=true

  # Production service
  web:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    ports: ["8080:80"]
    profiles: ["production"]
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/health"]
```

### Volume Strategy

**Development Volumes**:

- Source code mounting for live reload
- Named volume for node_modules (performance optimization)
- Cached mounting for better performance on macOS

**Production Volumes**:

- No volumes needed (immutable container pattern)
- All assets baked into the image

## Nginx Production Configuration

### Performance Optimizations

**Gzip Compression**:

```nginx
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript 
           application/json application/javascript application/xml+rss 
           application/rss+xml font/truetype font/opentype 
           application/vnd.ms-fontobject image/svg+xml;
```

**Cache Control Strategy**:

```nginx
# Dynamic cache control based on content type
map $sent_http_content_type $expires {
    default                    off;
    text/html                  epoch;        # Never cache HTML
    text/css                   max;          # Cache CSS for 1 year
    application/javascript     max;          # Cache JS for 1 year
    ~image/                    max;          # Cache images for 1 year
    ~font/                     max;          # Cache fonts for 1 year
}

# Static assets with aggressive caching
location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Security Headers

```nginx
# Security headers for all responses
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

### Health Check Implementation

```nginx
# Health check endpoint for container orchestration
location /health {
    access_log off;
    return 200 "healthy\n";
    add_header Content-Type text/plain;
}
```

## CI/CD Pipeline Architecture

### GitHub Actions Workflow

**Optimized Build Process**:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'          # Automatic npm cache
          
      - name: Install dependencies
        run: npm ci               # Use ci for reproducible builds
        
      - name: Build site
        run: npm run build
        env:
          PATH_PREFIX: /218_portfolio  # Environment-specific configuration
```

**Deployment Strategy**:

```yaml
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'    # Deploy only from main branch
```

### Environment Management

**Path Prefix Handling**:

The project handles different deployment contexts through environment variables:

```javascript
// .eleventy.js
eleventyConfig.addFilter('baseUrl', function (url) {
  const pathPrefix = process.env.PATH_PREFIX || '';
  return pathPrefix ? `${pathPrefix}${url}` : url;
});
```

**Template Usage**:

```html
<link rel="stylesheet" href="{{ '/css/main.css' | baseUrl }}">
```

## Development Workflow Automation

### Makefile for Developer Experience

**Common Development Tasks**:

```makefile
dev: ## Start development environment with live reload
	docker compose --profile dev up --build

prod: ## Start production environment with nginx
	docker compose --profile production up --build -d

build: ## Build production Docker image
	docker compose build web

clean: stop ## Stop containers and remove volumes
	docker compose --profile dev --profile production down -v
	docker system prune -f
```

### Environment Configuration

**.env.example Template**:

```bash
# Docker configuration
DOCKER_USERNAME=your-dockerhub-username
VERSION=latest
NODE_ENV=production
```

**Environment Loading**:

```makefile
# Load environment variables
include .env
export
```

## Container Orchestration Patterns

### Network Configuration

```yaml
networks:
  portfolio-network:
    driver: bridge
```

### Volume Management

```yaml
volumes:
  node_modules:    # Named volume for npm packages
```

### Service Dependencies

```yaml
services:
  web:
    depends_on:
      - database     # If needed for future enhancements
    restart: unless-stopped
```

## Performance Monitoring

### Health Checks

**Application Level**:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1
```

**Container Level**:

```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/health"]
  interval: 30s
  timeout: 3s
  retries: 3
  start_period: 5s
```

### Logging Strategy

**Nginx Access Logs**:

```nginx
log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                '$status $body_bytes_sent "$http_referer" '
                '"$http_user_agent" "$http_x_forwarded_for"';

access_log /var/log/nginx/access.log main;
```

**Container Log Management**:

```bash
# View logs in development
make logs-dev

# View logs in production
make logs-prod
```

## Security Best Practices

### Container Security

**Alpine Linux Base Images**:

- Minimal attack surface
- Regular security updates
- Small image size

**Non-Root User** (Enhancement opportunity):

```dockerfile
# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Switch to non-root user
USER nextjs
```

### Secret Management

**Environment Variables**:

```yaml
environment:
  - DATABASE_URL=${DATABASE_URL}
  - API_KEY=${API_KEY}
```

**Build-time Secrets**:

```dockerfile
# Using BuildKit secrets
RUN --mount=type=secret,id=npm_token \
    echo "//registry.npmjs.org/:_authToken=$(cat /run/secrets/npm_token)" > ~/.npmrc
```

## Deployment Strategies

### Blue-Green Deployment

```yaml
# docker-compose.blue-green.yml
services:
  web-blue:
    image: portfolio:blue
    profiles: ["blue"]
    
  web-green:
    image: portfolio:green
    profiles: ["green"]
    
  nginx-proxy:
    depends_on:
      - web-blue
      - web-green
```

### Rolling Updates

```bash
# Update script
docker compose pull
docker compose up -d --no-deps web
```

## Monitoring and Observability

### Application Metrics

**Health Check Endpoint**:

```nginx
location /health {
    return 200 '{"status":"healthy","timestamp":"$time_iso8601"}';
    add_header Content-Type application/json;
}
```

**Metrics Collection** (Future enhancement):

```javascript
// Prometheus metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(register.metrics());
});
```

## Backup and Recovery

### Data Persistence

```yaml
volumes:
  app-data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /host/path/to/data
```

### Automated Backups

```bash
#!/bin/bash
# backup.sh
docker compose exec -T database pg_dump -U user database > backup-$(date +%Y%m%d).sql
```

## Key Benefits of This DevOps Architecture

### 1. **Reliability**

- Health checks at multiple levels
- Graceful failure handling
- Automated recovery mechanisms

### 2. **Scalability**

- Container orchestration ready
- Stateless application design
- Horizontal scaling capability

### 3. **Security**

- Minimal attack surface
- Security headers implementation
- Secret management patterns

### 4. **Performance**

- Optimized nginx configuration
- Aggressive caching strategies
- Small container images

### 5. **Developer Experience**

- One-command development setup
- Hot reload in development
- Clear separation of environments

## Recommendations for Bauhaus Revival Project

### 1. **Adopt Core Patterns**

- Implement multi-stage Docker builds
- Use Docker Compose profiles for environments
- Set up comprehensive health checks

### 2. **Enhance Security**

- Add non-root user in containers
- Implement proper secret management
- Use security scanning in CI pipeline

### 3. **Improve Monitoring**

- Add application metrics collection
- Implement structured logging
- Set up alerting for health check failures

### 4. **Optimize Performance**

- Implement CDN for static assets
- Add Redis caching layer if needed
- Use image optimization in build process

This DevOps foundation provides a production-ready deployment strategy that can scale with project requirements while maintaining security and performance standards.