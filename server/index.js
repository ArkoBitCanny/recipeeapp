
import express from 'express';
import { connectMongodb } from './features/MongooseModel.js';
import userRouter from './features/UserRouter.js';
import cors from 'cors';
// import ngrok from '@ngrok/ngrok';

const app=express();
const PORT=3000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Welcome to recepe app");
})

app.use('/api/user',userRouter);

app.listen(3000,async()=>{
    connectMongodb();
    console.log("Server runs at https://da21-2409-40e0-40-3fe0-a143-498b-9774-3ee5.ngrok-free.app");
})