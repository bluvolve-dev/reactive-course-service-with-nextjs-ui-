FROM azul/zulu-openjdk-alpine:11
COPY target/*.jar app.jar
ENTRYPOINT exec java $JAVA_AGENT $JAVA_OPTS $JMX_OPTS -jar app.jar