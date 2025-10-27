import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async(req,res) => {

    try{
        // these fetches the user data from the user if
        let userData = await userModel.findById(req.userId);

        // from the userData that is name, email, pwd and cartData
        // we are accessing the cartData in this variable cartData
        let cartData = await userData.cartData;

        // and the cartData in userModel helps us
        // with when to icrement and initialized based on
        // data or items available or not
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        // here userid for accesing the particular user info and
        //we are  updating the cartData with new cartData
        await userModel.findByIdAndUpdate(req.userId, {cartData});
        res.json({success:true, message:"Added to Cart"})

    } catch(error){
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}


// remove items from user cart
const removeFromCart = async(req, res) => {

    try{

        let userData = await userModel.findById(req.userId);
        // accesing the cartData from userModel
        let cartData = await userData.cartData;
        // if the cartData contains items check if the count is greater than 0
        // if greater than 0 then decrement
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }

        // saving the new cartData by using the req.body.userId
        await userModel.findByIdAndUpdate(req.userId, {cartData});
        res.json({success:true, message:"Removed From Cart"})
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}


// fetch user cart data

const getCart = async(req, res) => {

    try{
        // access the userData from the userModel by id
        let userData = await userModel.findById(req.userId);
        // access the cartData field from the userData object
        let cartData = await userData.cartData;

        res.json({success:true, cartData});

    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}


export {addToCart, removeFromCart, getCart};