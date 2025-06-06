

import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const userModel=new mongoose.model('user',userSchema);
export default userModel;