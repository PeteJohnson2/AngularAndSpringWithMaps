#!/bin/bash
# install graalvm
# fix native build environment(missing libs)
# set prod profile in application.properties
# normal build
./gradlew clean build  -PwithAngular=true -PuseChromium=true
# run with native-image-agent
java -Dspring.aot.enabled=true -agentlib:native-image-agent=config-merge-dir=backend/src/main/resources/META-INF/native-image -jar ./backend/build/libs/angularAndSpringWithMaps.jar
# add liquibase data/*.csv files to META-INF/native-image/resource-config.json
#    {
#      "pattern":"\\Qdbchangelog/data/company_site.csv\\E"
#    },  
#    {
#      "pattern":"\\Qdbchangelog/data/location.csv\\E"
#    },
#    {
#      "pattern":"\\Qdbchangelog/data/polygon.csv\\E"
#    },
#    {
#      "pattern":"\\Qdbchangelog/data/ring.csv\\E"
#    },
# native build
./gradlew clean nativeCompile -PwithAngular=true -PuseChromium=true
# run native binary(more than 160MB)
./backend/build/native/nativeCompile/backend