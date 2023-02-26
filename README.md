# Home Library Service: Logging & Error handling and Authentication & Authorization

[Logging & Error handling Assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/logging-error-handling/assignment.md)  
[Authentication & Authorization Assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/authentication/assignment.md)  
[Logging & Error handling Scoring](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/logging-error-handling/score.md)  
[Authentication & Authorization Scoring](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/authentication/score.md)

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
git checkout logger-authentification
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

### Testing with Docker:

1. Run the application
```
npm run docker
```

2. Open new terminal and enter command to start tests with authentification:
```
npm run docker:test-auth
```

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

To run all tests with authentification:

```
npm run test:auth
```

To run only one of all test suites with authentification:

```
npm run test:auth -- <path to suite>
```

## Logging:

Application logs will be saved in `./logs` folder, this folder is also binded to docker container.  
Environment variable `LOGGER_LEVEL` sets logging level for application logs, **error** and **warning** logs will be written **ALWAYS**.  
Valid logging levels are:  
- `error` - errors (responses with statusCodes from 500 to 599)
- `warn` - errors, warnings (responses with statusCodes from 400 to 599)
- `log` - errors, warnings, logs (information about all requests) 
- `debug` - errors, warnings, logs, debug (information about what is happening in the app)

Log files are named in formats:
- <current time as ISO string>-app.log (logs that can be written according to current `logging level`)
- <current time as ISO string>-error.log (for errors and warnings, will be written **always**)

Environment variable ```MAX_LOG_FILE_SIZE``` sets max log file size in bytes. After log file reach this size, there will be created new log file.  

There is an additional `error` endpoint, that throws an error on server.  
>Server should answer with `status code` **500** and corresponding message

## Authentification:
All routes except `auth/signup`, `auth/login`, `auth/refresh`, `/doc`, `/`, `error` require to set HTTP authorization header.
- POST `auth/signup` - send login and password to create a new user
- POST `auth/login` - send login and password to get Access token and Refresh token
- POST `auth/refresh` - send refresh token in body as { refreshToken } to get new pair of Access token and Refresh token

You can use environment variables `TOKEN_AUTH_EXPIRE_TIME` and `TOKEN_REFRESH_EXPIRE_TIME` to set time of expiration of tokens.

## Detailed description of API:

### Entities

- `User` (with attributes):
  ```typescript
  interface User {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
  }
  ```

- `Artist` (with attributes):
  ```typescript
  interface Artist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
  }
  ```

- `Track` (with attributes):
  ```typescript
  interface Track {
    id: string; // uuid v4
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
  }
  ```

- `Album` (with attributes):
  ```typescript
  interface Album {
    id: string; // uuid v4
    name: string;
    year: number;
    artistId: string | null; // refers to Artist
  }
  ```

- `Favorites` (with attributes):
  ```typescript
  interface Favorites {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids
  }
  ```

### Endpoints:

* `Signup` (`auth/signup` route)
    * `POST auth/signup` - send `login` and `password` to create a new `user`
      - Server should answer with `status code` **201** and corresponding message if dto is valid
      - Server should answer with `status code` **400** and corresponding message if dto is invalid (no `login` or `password`, or they are not a `strings`)
* `Login` (`auth/login` route)
    * `POST auth/login` - send `login` and `password` to get Access token and Refresh token (optionally)
      - Server should answer with `status code` **200** and tokens if dto is valid
      - Server should answer with `status code` **400** and corresponding message if dto is invalid (no `login` or `password`, or they are not a `strings`)
      - Server should answer with `status code` **403** and corresponding message if authentication failed (no user with such `login`, `password` doesn't match actual one, etc.)
* `Refresh` (`auth/refresh` route)
    * `POST auth/refresh` - send refresh token in body as `{ refreshToken }` to get new pair of Access token and Refresh token
      - Server should answer with `status code` **200** and tokens in body if dto is valid
      - Server should answer with `status code` **401** and corresponding message if dto is invalid (no `refreshToken` in body)
      - Server should answer with `status code` **403** and corresponding message if authentication failed (Refresh token is invalid or expired)

* `Users` (`/user` route)
    * `GET /user` - get all users
      - Server should answer with `status code` **200** and all users records
    * `GET /user/:id` - get single user by id
      - Server should answer with `status code` **200** and and record with `id === userId` if it exists
      - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    * `POST /user` - create user (following DTO should be used)
      `CreateUserDto`
      ```typescript
          interface CreateUserDto {
            login: string;
            password: string;
          }
      ```
        - Server should answer with `status code` **201** and newly created record if request is valid
        - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    * `PUT /user/:id` - update user's password
      `UpdatePasswordDto` (with attributes):
      ```typescript
      interface UpdatePasswordDto {
        oldPassword: string; // previous password
        newPassword: string; // new password
      }
      ```
      - Server should answer with` status code` **200** and updated record if request is valid
      - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
      - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
      - Server should answer with` status code` **403** and corresponding message if `oldPassword` is wrong
    * `DELETE /user/:id` - delete user
      - Server should answer with `status code` **204** if the record is found and deleted
      - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

* `Tracks` (`/track` route)
    * `GET /track` - get all tracks
      - Server should answer with `status code` **200** and all tracks records
    * `GET /track/:id` - get single track by id
      - Server should answer with `status code` **200** and and record with `id === trackId` if it exists
      - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist
    * `POST /track` - create new track
      - Server should answer with `status code` **201** and newly created record if request is valid
      - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    * `PUT /track/:id` - update track info
      - Server should answer with` status code` **200** and updated record if request is valid
      - Server should answer with` status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
      - Server should answer with` status code` **404** and corresponding message if record with `id === trackId` doesn't exist
    * `DELETE /track/:id` - delete track
      - Server should answer with `status code` **204** if the record is found and deleted
      - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist

* `Artists` (`/artist` route)
    * `GET /artist` - get all artists
      - Server should answer with `status code` **200** and all artists records
    * `GET /artist/:id` - get single artist by id
      - Server should answer with `status code` **200** and and record with `id === artistId` if it exists
      - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist
    * `POST /artist` - create new artist
      - Server should answer with `status code` **201** and newly created record if request is valid
      - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    * `PUT /artist/:id` - update artist info
      - Server should answer with` status code` **200** and updated record if request is valid
      - Server should answer with` status code` **400** and corresponding message if `artist` is invalid (not `uuid`)
      - Server should answer with` status code` **404** and corresponding message if record with `id === artistId` doesn't exist
    * `DELETE /artist/:id` - delete album
      - Server should answer with `status code` **204** if the record is found and deleted
      - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist

* `Albums` (`/album` route)
    * `GET /album` - get all albums
      - Server should answer with `status code` **200** and all albums records
    * `GET /album/:id` - get single album by id
      - Server should answer with `status code` **200** and and record with `id === albumId` if it exists
      - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist
    * `POST /album` - create new album
      - Server should answer with `status code` **201** and newly created record if request is valid
      - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    * `PUT /album/:id` - update album info
      - Server should answer with` status code` **200** and updated record if request is valid
      - Server should answer with` status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
      - Server should answer with` status code` **404** and corresponding message if record with `id === albumId` doesn't exist
    * `DELETE /album/:id` - delete album
      - Server should answer with `status code` **204** if the record is found and deleted
      - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist

* `Favorites`
    * `GET /favs` - get all favorites
      - Server should answer with `status code` **200** and all favorite records (**not their ids**), split by entity type:
      ```typescript
      interface FavoritesResponse{
        artists: Artist[];
        albums: Album[];
        tracks: Track[];
      }
      ```
    * `POST /favs/track/:id` - add track to the favorites
      - Server should answer with `status code` **201** and corresponding message if track with `id === trackId` exists
      - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
      - Server should answer with `status code` **422** and corresponding message if track with `id === trackId` doesn't exist
    * `DELETE /favs/track/:id` - delete track from favorites
      - Server should answer with `status code` **204** if the track was in favorites and now it's deleted id is found and deleted
      - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if corresponding track is not favorite
    * `POST /favs/album/:id` - add album to the favorites
      - Server should answer with `status code` **201** and corresponding message if album with `id === albumId` exists
      - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
      - Server should answer with `status code` **422** and corresponding message if album with `id === albumId` doesn't exist
    * `DELETE /favs/album/:id` - delete album from favorites
      - Server should answer with `status code` **204** if the album was in favorites and now it's deleted id is found and deleted
      - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if corresponding album is not favorite
    * `POST /favs/artist/:id` - add artist to the favorites
      - Server should answer with `status code` **201** and corresponding message if artist with `id === artistId` exists
      - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
      - Server should answer with `status code` **422** and corresponding message if artist with `id === artistId` doesn't exist
    * `DELETE /favs/artist/:id` - delete artist from favorites
      - Server should answer with `status code` **204** if the artist was in favorites and now it's deleted id is found and deleted
      - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if corresponding artist is not favorite

  * `Error` (`error` route)
    * `GET error` - throws an Error on the server
      - Server should answer with `status code` **500** and corresponding message
