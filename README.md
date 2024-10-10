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

| Header          | Type     | Description                             |
| --------------- | -------- | --------------------------------------- |
| Authorization   | string   | **Required**. Bearer token for authorization |

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

#### View assignments tagged to the admin.

```http
  GET /portal/v1/admin/assignments
```

#### Accept or Reject an assignment.

```http
 GET /portal/v1/admin/assignments/:id/:action
```

| Path Parameter        | Type     | Description                             |
| ---------------  | -------- | --------------------------------------- |
| `id`             | string   | **Required**. The ID of the assignment   |
| `action`         | string   | **Required**. The action to perform (`accept`, `reject`) |

####  Upload an assignment.

```http
  POST /portal/v1/user/upload
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required** |
| `assignmentId` | `string` | **Required** |
| `assignmentContent` | `string` | **Required**|
| `adminId` | `string` | **Required** |


#### Fetch all admins

```http
 GET /portal/v1/user/admins
```

## Package Info

1. **bcrypt** - Password hashing.
2. **joi** - Input validation.
3. **jwt** - Token creation/verification.
4. **express** - Web server framework.
5. **mongoose** - MongoDB ORM.
6. **jest** - Unit testing framework.
7. **axios** - HTTP client for API requests.
8. **googleapis** - Google OAuth and API integration.


## Frontend

https://github.com/Vanshika-Dargan/assignment-portal-frontend
