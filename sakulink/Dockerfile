# Start with a Node.js base image with Bun pre-installed.
# Using the 'bun' image is ideal as it's optimized for this use case.
FROM oven/bun:latest

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Copy the package.json and bun.lockb (if it exists) to the working directory.
# This step is crucial for caching the dependencies.
COPY package.json bun.lock ./

# Install the project dependencies using 'bun install'.
RUN bun install --frozen-lockfile

# Copy the rest of the application source code into the container.
COPY . .

# Expose the port your application will run on.
# You will need to change this if your application uses a different port.
# EXPOSE 3000

# Define the command to run the application when the container starts.
# This uses the 'start' script defined in your package.json.
CMD [ "bun", "run", "dev" ]