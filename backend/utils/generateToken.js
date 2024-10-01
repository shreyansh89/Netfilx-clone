import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie =  (userId , res)=>{
    const token = jwt.sign({userId},ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

    res.cookie("jwt-netflix", token,{
        maxage : 15 * 60 * 60 * 1000, // 15 days in MS
        httpOnly : true, // prevent xss attaks cross-site scripting attacks, make it not be access by JS
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: ENV_VARS.NODE_ENV !== "devlopment",
    })

    return token;
}