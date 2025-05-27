import express from 'express';
import UserController from './UserController.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup', (req, res) => {
    userController.userSignUp(req, res);
})
userRouter.post('/login',(req,res)=>{
    userController.userLogin(req,res);
})


export default userRouter;



