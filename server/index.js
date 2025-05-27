
import express from 'express';
import { connectMongodb } from './features/MongooseModel.js';
import userRouter from './features/UserRouter.js';
import cors from 'cors';

const app=express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Welcome to recepe app");
})

app.use('/api/user',userRouter);

app.listen(3000,()=>{
    connectMongodb();
    console.log(`Server starts at http://localhost:3000`);
})