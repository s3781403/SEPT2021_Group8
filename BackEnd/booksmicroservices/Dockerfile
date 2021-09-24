FROM openjdk:8-jdk-alpine
WORKDIR /booksService
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
COPY target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","/app.jar"]
