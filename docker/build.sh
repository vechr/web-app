#!/bin/bash

# Build Imag
DOCKER_BUILDKIT=0 docker build \
  --build-arg APP_NATS_WS=nats://localhost:9000 \
  --build-arg APP_BACKEND_SERVICE=http://localhost \
  --build-arg APP_SECRET_COOKIE=SECRET_SECURE_COOKIE \
  -f docker/Dockerfile.prod \
  -t zulfikar4568/web-app .

# Push Image
docker push zulfikar4568/web-app:latest