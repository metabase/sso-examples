FROM eclipse-temurin:21-jre

WORKDIR /app

RUN apt-get update && apt-get install -y bash fonts-noto fontconfig curl ca-certificates-java

ADD https://downloads.metabase.com/enterprise/latest/metabase.jar .
ADD https://raw.githubusercontent.com/metabase/metabase/master/bin/docker/run_metabase.sh .

EXPOSE 3000

CMD ["java", "-jar", "metabase.jar"]