import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

import userModel from '../models/userModel.js';

const createToken = (id) => {
    return jwt.sign(
        {id}, process.env.JWT_SECRET
    )
};

// register User
const registerUser = async (req, res) => {
    // destructring the user details from req.body
    const { name, password, email } = req.body;

    try {
        // checking if the email already existing or not
        const exists = await userModel.findOne({ email });
        // these means email is existing
        if (exists) {
            return res.json({ success: false, message: "User Already Exists" })
        }

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ staus: false, message: "Enter Valid Email" })
        }

        // checking if the password length > 8 or not
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be greater than 8 characters" })
        }

        // hashing the user password with bcrypt
        //const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10);
        // our new passowrd is hashedPassowrd

        // creating a new user
        const newUser = new userModel({
            name : name,
            email : email,
            password : hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }


}

// login User
const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        // user variable stores the object of that particular email
        const user = await userModel.findOne({ email });

        // if there is no avialable user
        if (!user) {
            res.json({ success: false, message: "User Doesn't exists" })
        }

        // compare the user entered password and the password available
        // in the user object using bcrypt compare
        // passowrd -> user entered pwd
        // user.password -> password in user object
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.json({ success: false, message: "Invalid Credentials" });
        }

        const token = createToken(user._id);

        res.json({ success: true, token });

    }catch(error){
        console.log(error);
        res.json({ success:false, message:"Error" });
    }
}



export { loginUser, registerUser };