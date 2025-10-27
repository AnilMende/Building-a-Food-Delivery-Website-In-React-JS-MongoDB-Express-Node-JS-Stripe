import jwt from 'jsonwebtoken';

const authMiddleware = async (req,res,next) => {

    const {token} = req.headers;
    if(!token){
        return res.json({success:false, message:"Error"});
    }

    try{
        // we verify the token with the same secret key we generated
        // to find is it same token that generated from secret key
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // and if its valid then we extracts the id from it because
        // we signed it using the id and secret key
        // req.body.userId contains the user id
        // this token_decode.id is the mongodb id of the user
        
        // we are avoiding the req.body.userId because get request does not contain the body
        // it contains headers and params, 
        // if we use it may give cannot set properties undefined error
        req.userId = token_decode.id;
        next();

    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export default authMiddleware;