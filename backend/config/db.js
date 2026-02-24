import mongoose from "mongoose";

// export const connectDB = async () => {
//     await mongoose.connect('mongodb+srv://anilmende:anil12345678@cluster0.yi51emz.mongodb.net/food-del')
//     .then(() => console.log('DB Connected'))
//}

export const connectDB = async () => {
    try {

        await mongoose.connect(`${process.env.MONGODB_URI}/food-delivery`);
        console.log('Databse Connected');
        
    } catch (error) {
        console.log(error);
    }
}
