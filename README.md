# Home Library Service

[Assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md)
[Scoring](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/score.md)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## How to download and install application:

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
git checkout nodejs2022Q4-service
```
### 4. Install dependencies:
```
npm install
```
### 5. Rename **.env.example** to **.env**

## How to run application:

Run the application
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

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
>For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```
