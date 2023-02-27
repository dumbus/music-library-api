# Home Library Service: Containerization and Database & ORM

[Assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/containerization-database-orm/assignment.md)  
[Scoring](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/containerization-database-orm/score.md)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/).
- Docker Hub - [Create Docker Hub account](https://hub.docker.com/)

## How to download an application:

### 1. Clone repository:
```
git clone https://github.com/dumbus/nodejs2022Q4-service.git
```
### 2. Change active directory:
```
cd nodejs2022Q4-service
```
### 3. Change repository branch:
```
git checkout docker-database
```

## How to run application with Docker:

1. Rename **.env.example** to **.env**

2. Set environment variables in .env file (if needed)

3. Run the application
```
npm run docker
```

After starting the app on port (4000 as default) you can open OpenAPI documentation in your browser by typing 
```
http://localhost:4000/doc/
```

[Link to private Docker Hub repository](https://hub.docker.com/repository/docker/dumbus/rest-service/general)

### Vulnerabilities scanning:

After building images with command ```npm run docker``` you can scan application image for vulnerabilities:

1. Login to your DockerHub account:
```
docker login
```

2. Scan image with command:
```
npm run docker:scan
```

### Testing with Docker:

1. Run the application
```
npm run docker
```

2. Open new terminal and enter command to start tests:
```
npm run docker:test
```

## How to run application without Docker:

1. Install dependencies:
```
npm install
```

2. Rename **.env.example** to **.env**
 
3. Set environment variables in .env file (if needed)

4. Run the application
```
npm run start
```

Run the application in a development mode:
```
npm run start:dev
```

Run the application in a production mode:
```
npm run start:prod
```

After starting the app on port (4000 as default) you can open OpenAPI documentation in your browser by typing 
```
http://localhost:4000/doc/
```
>For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Testing without Docker:

After application running open new terminal and enter:

To run all tests:

```
npm run test
```

To run only one of all test suites:

```
npm run test -- <path to suite>
```
