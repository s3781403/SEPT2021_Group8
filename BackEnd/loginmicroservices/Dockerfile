FROM openjdk:8-jdk-alpine
WORKDIR /loginService
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]