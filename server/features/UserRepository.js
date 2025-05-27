

import userModel from "./UserSchema.js";

export default class UserRepository{
    

    async Signup({name,mail,password}){
        try {
            const user=new userModel({name,mail,password});
            const newUser=await user.save();
            return newUser;
        } catch (error) {
            console.log(error);
        }
    }

    async Login(mail){
        try {
            const exist=await userModel.findOne({mail});
            return exist;
        } catch (error) {
            console.log(error);
        }
    }
}