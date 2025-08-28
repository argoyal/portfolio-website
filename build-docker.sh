#!/bin/bash

# Docker build script for portfolio website
# This script automatically loads environment variables and builds the Docker image

set -e  # Exit on any error

echo "🚀 Starting Docker build for portfolio website..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local file not found!"
    echo "Please create .env.local with your Firebase configuration first."
    echo "You can copy from firebase-config.example and fill in your values."
    exit 1
fi

# Load environment variables from .env.local
echo "📋 Loading environment variables from .env.local..."
export $(cat .env.local | grep -v '^#' | xargs)

# Check if required environment variables are set
required_vars=(
    "NEXT_PUBLIC_FIREBASE_API_KEY"
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID"
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
    "NEXT_PUBLIC_FIREBASE_APP_ID"
)

echo "🔍 Validating environment variables..."
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Error: $var is not set in .env.local"
        exit 1
    fi
    echo "✅ $var is set"
done

# Get current timestamp for tagging
timestamp=$(date +%Y%m%d_%H%M%S)
image_name="portfolio-website"
tag_latest="$image_name:latest"
tag_timestamp="$image_name:$timestamp"

echo "🏗️  Building Docker image..."
echo "📅 Timestamp: $timestamp"
echo "🏷️  Tags: $tag_latest, $tag_timestamp"

# Build Docker image with all build arguments
docker build \
    --build-arg NEXT_PUBLIC_FIREBASE_API_KEY="$NEXT_PUBLIC_FIREBASE_API_KEY" \
    --build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" \
    --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID="$NEXT_PUBLIC_FIREBASE_PROJECT_ID" \
    --build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET" \
    --build-arg NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" \
    --build-arg NEXT_PUBLIC_FIREBASE_APP_ID="$NEXT_PUBLIC_FIREBASE_APP_ID" \
    -t "$tag_latest" \
    -t "$tag_timestamp" \
    .

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
    echo "📦 Image tags:"
    echo "   - $tag_latest"
    echo "   - $tag_timestamp"
    
    # Show image info
    echo ""
    echo "📊 Image information:"
    docker images "$image_name" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"
    
    echo ""
    echo "🚀 Ready to run! Use one of these commands:"
    echo ""
    echo "Basic run:"
    echo "  docker run -d --name portfolio-website -p 3000:3000 $tag_latest"
    echo ""
    echo "With restart policy:"
    echo "  docker run -d --name portfolio-website --restart unless-stopped -p 3000:3000 $tag_latest"
    echo ""
    echo "With resource limits:"
    echo "  docker run -d --name portfolio-website --restart unless-stopped --memory=\"512m\" --cpus=\"0.5\" -p 3000:3000 $tag_latest"
    
else
    echo "❌ Docker build failed!"
    exit 1
fi
