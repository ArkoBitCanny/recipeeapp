import mongoose from 'mongoose';

export const connectMongodb=async()=>{
    try {
        await mongoose.connect('mongodb+srv://arko:12345@cluster0.0xs2fof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Database Connected");
    } catch (error) {
        console.log(error);
    }
}