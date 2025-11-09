import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/food-delivery')
                  .then(() => console.log("DB Connected"))
          
}

// mongodb+srv://anilmende2002_db_user:<db_password>@backenddb.tfmowwm.mongodb.net/
