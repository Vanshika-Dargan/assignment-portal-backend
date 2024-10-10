import express from 'express';
import mongoose from 'mongoose';
import { userRoutes } from './modules/user/routes/user-route.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { adminRoutes } from './modules/admin/routes/admin-route.js';
import { assignmentRoutes } from './modules/assignment/routes/assignment-route.js';
import customError from './shared/error_handler/custom-error.js';
import globalErrorHandler from './shared/error_handler/global-error-handler.js';
dotenv.config();

const DB_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const DB_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DB_HOST = process.env.MONGODB_HOST;
const DB_PORT = process.env.MONGODB_PORT;
const PORTAL_PORT = process.env.PORTAL_PORT

// const URL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
const URL = process.env.MONGO_TEST;
const app=express();
const router = express.Router();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Connected to Portal Server...')
  })

router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
router.use('/assignment', assignmentRoutes);

app.use('/portal/v1', router);
app.all('*',(req,res,next)=>{
  const error= new customError(404,`${req.originalUrl} does not exist`);
  next(error);
})
app.use(globalErrorHandler);

async function main() {
    try{
      await mongoose.connect(URL);
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