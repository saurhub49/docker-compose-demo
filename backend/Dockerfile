# Stage 1: Build the application using Maven
FROM maven:3.9.5 AS build

# Set the working directory within the container to /app
WORKDIR /app

# Copy all files from the current directory (.) to the container's working directory (/app)
COPY . .

# Run the Maven clean install command with the option to skip tests
RUN mvn clean install -DskipTests

# Stage 2: Create a lightweight container with only the necessary artifacts
FROM openjdk:21

# Set the working directory within the container to /app
WORKDIR /app

# Copy the built JAR file from the previous stage into the current stage
COPY --from=build /app/target/*.jar server.jar

# Expose port 8080 to allow external connections to the application
EXPOSE 8080

# Specify the command to run when the container starts - run the Java application using the JAR file
CMD ["java", "-jar", "server.jar"]
