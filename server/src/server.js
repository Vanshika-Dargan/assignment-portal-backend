import express from 'express';
import {MongoClient} from 'mongodb';


const app=express();
const PORT=8000;

const DB_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const DB_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DB = process.env.MONGO_INITDB_DATABASE;
const DB_HOST = process.env.MONGODB_HOST;
const DB_PORT = process.env.MONGODB_PORT;
const DB_COLLECTION = process.env.MONGODB_COLLECTION;

const PORTAL_HOST = process.env.PORTAL_HOST
const PORTAL_PORT = process.env.PORTAL_PORT

const URL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
const client = new MongoClient(URL);



async function main() {
    try{
    await client.connect();
    const db = client.db(DB);
    const collection = db.collection(DB_COLLECTION);
    console.log('Connected successfully to MongoDB');
    app.listen(PORTAL_PORT, () => {
      console.log(`Server running on Port ${PORTAL_PORT}`);
  })
  }
  catch(error){
  console.log('Something went wrong...',error.message);
  }
}

main().then(()=> console.log('Server started successfully')).catch(error=>console.error(error));