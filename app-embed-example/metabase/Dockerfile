FROM eclipse-temurin:11-jre-focal

WORKDIR /app

RUN apt-get update && apt-get install -y bash ttf-dejavu fontconfig curl ca-certificates-java

ADD https://downloads.metabase.com/enterprise/latest/metabase.jar .
ADD https://raw.githubusercontent.com/metabase/metabase/master/bin/docker/run_metabase.sh .

EXPOSE 3000

CMD ["java", "-jar", "metabase.jar"]