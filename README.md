# nodejs-restapi-mongo-redis-docker

Example Project on how to build and develop REST API with NodeJS, MongoDB, Redis and Docker

## INSTALLATION

Use the docker-compose

```bash
docker-compose up -d
```

# REST API

## User CRUD

### GET
```bash
curl --location --request GET 'http://localhost:8080/user/:id'
```

### CREATE
```bash
curl --location --request POST 'http://localhost:8080/user' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Accept: Application/json' \
--data-urlencode 'username=user' \
--data-urlencode 'email=email@email' \
--data-urlencode 'password=password' \
--data-urlencode 'accountNumber=123' \
--data-urlencode 'identityNumber=456'
```

### UPDATE
```bash
curl --location --request PUT 'http://localhost:8080/user/:id' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Accept: Application/json' \
--data-urlencode 'username=newUsername' \
--data-urlencode 'email=newemal@email' \
--data-urlencode 'password=newPassword'
```

### DELETE
```bash
curl --location --request DELETE 'http://localhost:8080/user/:id'
```

### GET USERS BY ACCOUNT NUMBER
```bash
curl --location --request GET 'http://localhost:8080/getAllUserByAccountNumber' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'accountNumber=123'
```

### GET USERS BY IDENTITY NUMBER
```bash
curl --location --request GET 'http://localhost:8080/getAllUserByIdentityNumber' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'identityNumber=123'
```

## AUTHENTICATION

### LOGIN
```bash
curl --location --request POST 'http://localhost:8080/login' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username=test' \
--data-urlencode 'password=a'
```

### PROTECTED PAGE
```bash
curl --location --request GET 'http://localhost:8080/protectedPage' \
--header 'x-access-token: <TOKEN>'
```