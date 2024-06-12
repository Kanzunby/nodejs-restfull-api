# User API Spec

## Register User API

Endpoint : POST /api/users

Requestt Body :

```json
{
  "username": "bycrp",
  "password": "bairuha12",
  "name": "Kanzun Bairuha"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "bycrp",
    "name": "Kanzun Bairuha"
  }
}
```

Respponse Body Error :

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "bycrp",
  "password": "bairuha12"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username or passwornd wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "Kanzun Bairuha", // optional
  "password": "new password" // optional
}
```

Response Body Success :

```json
{
  "data": {
    "username": "bycrp",
    "name": "Kanzun Bairuha"
  }
}
```

Response Body Errors :

```json
{
  "errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "username": "bycrp",
    "name": "Kanzun Bairuha"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```
