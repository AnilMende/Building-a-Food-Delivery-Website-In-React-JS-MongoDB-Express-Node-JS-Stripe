import foodModel from "../models/foodModel.js";
import fs from 'fs';


// add food item
const addFood = async(req,res) => {

    try{
        const {name, description, price, category} = req.body;

        const image = req.file ? req.file.filename : null;

        if(!image) return res.status(400).json({message : "Image file is required"});

        const food = new foodModel({name, description, price, category, image});

        await food.save();
        // res.status(201).json({message : "Food Added Successfully"});
        res.json({success:true,message:"Food Added"})

    }catch(error){
        console.log(error);
        // res.status(201).json({message : "Error adding Food"})
        res.json({success:false, message:"Error"});
    }
}

// all Food List
const listFood = async(req, res) => {
    try{
        const foods = await foodModel.find({});
        res.json({success:true, data:foods});
        // res.json({foods})

    }catch(error){
        // res.status(400).json({message : message.error});
        res.json({success:false, message:"Error"})
    }
}

// removeFood
const removeFood = async(req, res) => {
    try{

        // we are finding the food model by using id
        const food = await foodModel.findById(req.body.id);
        // deleting the image from the folder
        fs.unlink(`uploads/${food.image}`, () => {});

        // deleting the food data from the database
        await foodModel.findByIdAndDelete(req.body.id);
        // res.json({success : true,message:"Food Removed"})
        res.status(200).json({success:true,message : "Food Removed Successfully"})

    }catch(error){
        console.log(error);
        res.status(400).json({message : "Error"});
        // res.json({success : false, message : "Error"});
    }
}

export { addFood, listFood, removeFood };