Preparations
1.download JDK 1.8.0, set JAVA_HOME
2.download eclipse EE
3.download Maven 
4.download Git

Import Project
1.open Eclipse
2.File -> Import -> Maven -> Existing Maven Projects
3.select the project root folder as Root directory

Include dropwizard into Project
1.run the following mvn commonds in the Project root folder
mvn archetype:generate -DarchetypeGroupId=io.dropwizard.archetypes -DarchetypeArtifactId=java-simple DarchetypeVersion=[1.0.2]

it will take sometime download dropwizard related jars

2. run the following command to build project in the Project root folder
mvn package

3. run the following command to run the application in the Project root folder
java -jar target/ineuron-0.0.1-SNAPSHOT.jar server INeuron.yml

4.access the api
http://localhost:8080/hello-world?name=Successful+Dropwizard+User
