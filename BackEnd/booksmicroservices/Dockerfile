FROM openjdk:8-jdk-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app1.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","/app1.jar"]
