# express-jwt-mongoose-example

**A basic example of express server with JWT authentication (passport.js) and user entity handled by Mongoose**

Edit the `config/index.js` and set your `MONGODB_URI_HERE`. Run the application `npm run dev` and import the postman collection to test it.

## Authentication

The authentication is jwt based. I use `passport` with `passport-local` and `passport-jwt` strategies in order to handle the authentication with the basic email / password fields.
When a user is authenticated, the `jwt token` is sent to the client which has to store it. When the client wants to access to a restricted route, the client must provide the `jwt token` in the header request.

## API endpoints

The [postman](./postman/) folder contains a postman collection to test the app.

### Register a user: `/jwt-auth/register`

```
POST /jwt-auth/register HTTP/1.1
User-Agent: PostmanRuntime/7.39.1
Accept: */*
Cache-Control: no-cache
Postman-Token: 3f653518-8444-4b11-80fa-0a28f663b63b
Host: 127.0.0.1:3000
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Length: 39
 
email=alfonso%40mir.cat&password=patata
```

### Authenticate user with form: `/jwt-auth/login`

```
POST /jwt-auth/login HTTP/1.1
User-Agent: PostmanRuntime/7.39.1
Accept: */*
Cache-Control: no-cache
Postman-Token: 91766204-6096-4f4a-be4e-0629cf383b0f
Host: 127.0.0.1:3000
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Length: 39
 
email=alfonso%40mir.cat&password=patata
```

### Authenticate user with basic auth: `/jwt-auth/login`

```
POST /jwt-auth/login HTTP/1.1
Authorization: Basic TW9uc2VycmF0X0Nyb29rczk1QGdtYWlsLmNvbTpwYXRhdGE=
User-Agent: PostmanRuntime/7.39.1
Accept: */*
Cache-Control: no-cache
Postman-Token: 8ed3b30c-7e40-4df3-b755-ff60d777f59d
Host: 127.0.0.1:3000
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Length: 0
```

### Access restricted route: `/restricted`

You need put the `jwt token` in the request header, using `Authorization` key field and concat `"Bearer " + jwtToken` in the value field.
```
GET /restricted HTTP/1.1
Cache-Control: no-cache
Postman-Token: <calculated when request is sent>
Host: <calculated when request is sent>
User-Agent: PostmanRuntime/7.39.1
Accept: */*
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjkxMjExNTBhMTRmY2EwNDRjYWJmZWY2IiwidGltZXN0YW1wIjoxNzYyNzkxODQ4NTk2LCJpYXQiOjE3NjI3OTE4NDgsImV4cCI6MTc2Mjk2NDY0OH0.uFM5rCy-uIxK-6-fx5GHgHFByPcJX0Cm81Rd8nufSTE
```

### Logout: `/jwt-auth/logout`

You need put the `jwt token` in the request header, using `Authorization` key field and concat `"Bearer " + jwtToken` in the value field.
```
DELETE /jwt-auth/logout HTTP/1.1
Cache-Control: no-cache
Postman-Token: <calculated when request is sent>
Host: <calculated when request is sent>
User-Agent: PostmanRuntime/7.39.1
Accept: */*
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjkxMjExNTBhMTRmY2EwNDRjYWJmZWY2IiwidGltZXN0YW1wIjoxNzYyNzkxODQ4NTk2LCJpYXQiOjE3NjI3OTE4NDgsImV4cCI6MTc2Mjk2NDY0OH0.uFM5rCy-uIxK-6-fx5GHgHFByPcJX0Cm81Rd8nufSTE
```
