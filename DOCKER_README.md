# Docker Production Deployment Guide

This guide explains how to build and deploy your Next.js portfolio website using Docker in production.

## Prerequisites

- Docker installed on your system
- Firebase configuration values ready
- Port 3000 available on your host machine

## Environment Variables

Create a `.env.local` file in your project root with your Firebase configuration:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## Building the Docker Image

### Method 1: Build with build arguments (Recommended for CI/CD)

```bash
docker build \
  --build-arg NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here \
  --build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com \
  --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id \
  --build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com \
  --build-arg NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789 \
  --build-arg NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456 \
  -t portfolio-website:latest .
```

### Method 2: Build with environment file

```bash
# Export environment variables
export $(cat .env.local | xargs)

# Build with exported variables
docker build \
  --build-arg NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY \
  --build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN \
  --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID \
  --build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET \
  --build-arg NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID \
  --build-arg NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID \
  -t portfolio-website:latest .
```

### Method 3: Build script (Easiest)

Create a `build-docker.sh` script:

```bash
#!/bin/bash
set -e

# Load environment variables
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
fi

# Build Docker image
docker build \
  --build-arg NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY \
  --build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN \
  --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID \
  --build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET \
  --build-arg NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID \
  --build-arg NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID \
  -t portfolio-website:latest .

echo "Docker image built successfully!"
```

Make it executable and run:
```bash
chmod +x build-docker.sh
./build-docker.sh
```

## Running the Container

### Basic run
```bash
docker run -d \
  --name portfolio-website \
  -p 3000:3000 \
  portfolio-website:latest
```

### Run with custom port
```bash
docker run -d \
  --name portfolio-website \
  -p 8080:3000 \
  portfolio-website:latest
```

### Run with restart policy
```bash
docker run -d \
  --name portfolio-website \
  --restart unless-stopped \
  -p 3000:3000 \
  portfolio-website:latest
```

### Run with resource limits
```bash
docker run -d \
  --name portfolio-website \
  --restart unless-stopped \
  --memory="512m" \
  --cpus="0.5" \
  -p 3000:3000 \
  portfolio-website:latest
```

## Container Management

### View running containers
```bash
docker ps
```

### View logs
```bash
docker logs portfolio-website
docker logs -f portfolio-website  # Follow logs
```

### Stop container
```bash
docker stop portfolio-website
```

### Remove container
```bash
docker rm portfolio-website
```

### Restart container
```bash
docker restart portfolio-website
```

## Production Deployment

### 1. Build and tag for registry
```bash
docker build \
  --build-arg NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here \
  --build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com \
  --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id \
  --build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com \
  --build-arg NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789 \
  --build-arg NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456 \
  -t your-registry.com/portfolio-website:latest .
```

### 2. Push to registry
```bash
docker push your-registry.com/portfolio-website:latest
```

### 3. Deploy on production server
```bash
docker pull your-registry.com/portfolio-website:latest
docker run -d \
  --name portfolio-website \
  --restart unless-stopped \
  --memory="512m" \
  --cpus="0.5" \
  -p 3000:3000 \
  your-registry.com/portfolio-website:latest
```

## Health Monitoring

The container includes a health check that runs every 30 seconds. You can monitor it with:

```bash
docker inspect --format='{{.State.Health.Status}}' portfolio-website
```

## Security Features

- **Non-root user**: Container runs as `nextjs` user (UID 1001)
- **Minimal base image**: Uses Alpine Linux for smaller attack surface
- **Multi-stage build**: Reduces final image size and removes build tools
- **No sensitive files**: `.dockerignore` excludes environment files

## Performance Optimizations

- **Multi-stage builds**: Separates build and runtime dependencies
- **Layer caching**: Optimized for Docker layer caching
- **Standalone output**: Next.js standalone mode for minimal runtime
- **Alpine Linux**: Lightweight base image
- **Production dependencies only**: Excludes dev dependencies from final image

## Troubleshooting

### Build fails with environment variables
- Ensure all required build args are provided
- Check that `.env.local` file exists and has correct values
- Verify Firebase configuration values are correct

### Container won't start
- Check logs: `docker logs portfolio-website`
- Verify port 3000 is not already in use
- Ensure the build completed successfully

### Performance issues
- Monitor resource usage: `docker stats portfolio-website`
- Adjust memory and CPU limits if needed
- Check if the health check is passing

## Environment Variable Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | Yes |

## Best Practices

1. **Always use specific tags** instead of `latest` in production
2. **Set resource limits** to prevent container from consuming all resources
3. **Use restart policies** for automatic recovery
4. **Monitor health checks** to ensure application availability
5. **Regular security updates** by rebuilding with updated base images
6. **Backup your data** before major deployments
7. **Test in staging** before deploying to production
