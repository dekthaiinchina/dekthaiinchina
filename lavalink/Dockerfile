# Use a lightweight OpenJDK image as the base. Java 17 or higher is required.
FROM openjdk:21-jdk-slim

# Install curl, which is not included in the slim image by default.
RUN apt-get update && apt-get install -y curl

# Set the working directory inside the container.
WORKDIR /opt/lavalink

# Expose the default port for Lavalink.
EXPOSE 2333

# Download the latest Lavalink JAR file.
# We're using a specific version (4.1.1) to ensure reproducibility.
# You can update this URL to a newer release if available.
RUN curl -LJO https://github.com/lavalink-devs/Lavalink/releases/download/4.1.1/Lavalink.jar

# Copy the local application.yml into the container.
# This file must be in the same directory as the Dockerfile.
COPY application.yml .

# Set the entrypoint to run the JAR file with the specified heap size.
# Adjust -Xmx based on your server's available memory.
ENTRYPOINT ["java", "-Xmx512M", "-jar", "Lavalink.jar"]
