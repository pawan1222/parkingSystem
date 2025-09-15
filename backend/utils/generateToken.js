import jwt from "jsonwebtoken"


//generate jwt token
export const generateToken = (userId,res) => {
    const token = jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    );

    //send json-web-token in cookie
    res.cookie("jwt",token, {
        maxAge : 7*24*60*60*1000,
        httpOnly : true,        //prevent xss attacks cross-site scripting attacks
        sameSite : "none",    //CSRF attacks cross-site request forgery attacks
        secure : true,
    });

    return token;
};



