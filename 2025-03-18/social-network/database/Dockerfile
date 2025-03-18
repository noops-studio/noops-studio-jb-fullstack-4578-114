# Use the official MySQL image as the base
FROM mysql:latest

# Set environment variables
ENV MYSQL_ALLOW_EMPTY_PASSWORD=1
ENV MYSQL_DATABASE=twitter
ENV MYSQL_TCP_PORT=3306

# Copy the SQL file to the Docker entrypoint directory for automatic execution
COPY twitter.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306
