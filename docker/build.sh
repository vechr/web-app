#!/bin/bash

# Build Imag
docker build -f docker/Dockerfile.prod -t zulfikar4568/web-app .

# Push Image
docker push zulfikar4568/web-app:latest