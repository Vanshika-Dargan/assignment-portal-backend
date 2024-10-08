# Assignment Portal Backend


## Getting Started

add the following file in db

db/init.js

```bash
 db = db.getSiblingDB('admin'); 

db.createUser({
    user: "username",
    pwd: "password", 
    roles: [{ role: "readWrite", db: "admin" }] 
});

```

add and modify .env

e.g ref

```bash
MONGODB_HOST=mongodb
MONGODB_PORT=27017


MONGO_INITDB_ROOT_USERNAME=username
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_INITDB_DATABASE=admin


PORTAL_HOST=portal
PORTAL_PORT=8000

```


## Run Locally

Prerequisites : You should have docker installed on your host os.

```bash
  docker compose --env-file .env up --build
```



