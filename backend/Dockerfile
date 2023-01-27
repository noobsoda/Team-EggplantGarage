FROM    openjdk:8-jdk-alpine
ARG     JAR_FILE=build/libs/*.jar
COPY    backend/${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]