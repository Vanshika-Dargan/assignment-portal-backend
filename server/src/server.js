import express from 'express';
import mongoose from 'mongoose';
import { userRoutes } from './modules/user/routes/user-route.js';


const DB_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const DB_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DB_HOST = process.env.MONGODB_HOST;
const DB_PORT = process.env.MONGODB_PORT;
const PORTAL_PORT = process.env.PORTAL_PORT

const URL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;


const app=express();
app.use(express.json());


app.use('/',userRoutes);



async function main() {
    try{
      await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
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