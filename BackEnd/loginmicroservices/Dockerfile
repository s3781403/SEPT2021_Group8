FROM openjdk:8-jdk-alpine AS build
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
COPY --from=build target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]