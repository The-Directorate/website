#!/bin/bash

IMAGE_NAME="directorate-website"
CONTAINER_NAME="directorate-website-container"

# Stop and remove old container if it exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "Stopping and removing previous container ($CONTAINER_NAME)..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# Build the Docker image
echo "Building Docker image ($IMAGE_NAME)..."
docker image prune -f
docker build -t $IMAGE_NAME .

# Run the container, mounting certs
echo "Running new Docker container on ports 1000..."
docker run -d -p 1000:80 \
    --name $CONTAINER_NAME \
    $IMAGE_NAME

echo "Website deployment complete!"
