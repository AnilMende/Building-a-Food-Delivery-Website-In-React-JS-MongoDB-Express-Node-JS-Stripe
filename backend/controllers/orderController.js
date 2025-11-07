import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // const frontend_url = "https://food-del-frontend-u6qi.onrender.com"
// placing user order for frontend
const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173"
    // const frontend_url = "https://food-del-frontend-u6qi.onrender.com"

    try{
        const {items, amount, address, paymentMethod} = req.body;
        // creating a new order
        const newOrder = new orderModel({
            userId:req.userId,
            items,
            amount,
            address,
            paymentMethod: paymentMethod || 'Stripe',
            payment: paymentMethod === "COD" ? false : null, 
        })
        // save the new order in our database
        await newOrder.save();

        // after new order we have to clear the cart data
        await userModel.findByIdAndUpdate(req.userId, { cartData:{} });

        // if COD skip stripe
        if(paymentMethod === "COD"){
            return res.json({
                success:true,
                message:"Order placed successfully with cash on deliver",
                cod:true
                // orderId : newOrder._id
            })
        }

        // stripe payment setup
        const line_items = req.body.items.map((item) => ({

             price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
             },
             quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100
            },
            quantity:1
        })


        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            // if the payment is success we will be redirected back to this url page
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            // if payment is not done then we will be redirected back to this url page
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success:true, session_url:session.url})

    }catch(error){
        console.log("Error Placing Order", error);
        res.json({success:false, message:"Error Placing Order"});
    }
}


const verifyOrder = async(req, res) => {

    const {orderId, success} = req.body;

    try{
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({success:true, message:"Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Not Paid"})
        }

    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}


// user Orders for frontend
const userOrders = async (req, res) => {

    try{
        // we will get all the orders from the userId
        // that will be stored in the orders variable
        // const orders = await orderModel.find({userId:req.userId});
        // making the latest order to appear first
        const orders = await orderModel.find({ userId: req.userId}).sort({ createdAt: -1});
        res.json({success:true, data:orders})

    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}


// Listing orders for admin panel
const listOrders = async(req, res) => {

    try{
        const orders = await orderModel.find({});
        res.json({success:true, data:orders});

    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}


// api for updating the order status
const updateStatus = async(req, res) => {
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status});
        res.json({success:true, message:"Status Updated"})

    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}


export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus};
