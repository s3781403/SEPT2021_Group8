FROM openjdk:8-jdk-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
COPY target/booksmicroservices-0.0.1-SNAPSHOT.jar app1.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","/app1.jar"]
