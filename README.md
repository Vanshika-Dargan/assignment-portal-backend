# Assignment Portal Backend


## Setup with Docker

1. add the following file in db

db/init.js

```bash
 db = db.getSiblingDB('admin'); 

db.createUser({
    user: "username",
    pwd: "password", 
    roles: [{ role: "readWrite", db: "admin" }] 
});

```

2. add .env in the root

```bash
MONGODB_HOST=mongodb
MONGODB_PORT=27017


MONGO_INITDB_ROOT_USERNAME=vanshika
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_INITDB_DATABASE=admin

PORTAL_HOST=portal
PORTAL_PORT=8000


GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CLIENT_REDIRECT_URL=

JWT_SECRET=
JWT_EXPIRY=

```

3. Run the following command in terminal

```bash
  docker compose --env-file .env up --build
```

## Setup Without Docker

1. add .env with this additional key

```bash
MONGO_TEST='your mongodb cloud atlas url goes here'
```

## API Reference

#### Register Admin or User

```http
  POST /portal/v1/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required** |
| `email` | `string` | **Required** |
| `password` | `string` | **Required**|
| `confirmPassword` | `string` | **Required** |
| `role` | `string` | **Required**. 'admin' or 'user' |


#### Login Admin or User

```http
 POST /portal/v1/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `string` | **Required**. 'google' or 'custom' |
| `email`      | `string` | **Required** for type 'custom' |
| `password`      | `string` | **Required**. for type 'custom' |



## Frontend

https://github.com/Vanshika-Dargan/assignment-portal-frontend
