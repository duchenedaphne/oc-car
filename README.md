# 🚘 Your Car Your Way (POC) 

Rent a car from this internationnal british company app,   
and chat with the customer service if you need any help. 

## 🛠 Software tools

- [Angular CLI](https://github.com/angular/angular-cli) 14
- [Java](https://www.oracle.com/java/technologies/downloads/) 17
- [Spring Boot](https://start.spring.io/;) 3
- [Maven](https://maven.apache.org/download.cgi) 4
- [MySQL](https://www.mysql.com/fr/downloads/) 8

## Start the project

Clone this repository :
> git clone https://github.com/duchenedaphne/oc-car

### MySQL :

The SQL script for creating the schema is available here : `ressources/script.sql`.

### Back-end :  

Go inside folder :
> cd poc

In your IDE :  
Add 2 environment variables with your database credentials,   
for the `application.properties` file :

>spring.datasource.username=${DB_USER}

>spring.datasource.password=${DB_PASSWORD}

Install the dependencies :
> mvn clean install

Launch the backend server with Spring Boot and Maven :  
> mvn spring-boot:run

### Front-end :

Go inside folder:
> cd front

Install the dependencies :
> npm install

Launch the dev server :
> ng serve  

or

> npm run start

Navigate to http://localhost:4200/

Build the project :
> ng build

The build artifacts will be stored in the `dist/` directory.

## ✍ Author
Daphné Duchêne
