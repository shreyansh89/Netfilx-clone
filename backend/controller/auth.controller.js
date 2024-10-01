import { User } from "../models/user.model.js";
import bcryptjs from  'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generateToken.js";


export async function signup(req,res){
    try {
        const {email, password, username} = req.body;
        if(!email || !password || !username){
            return res.status(400).json({success:false,message:"All fields are required"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false,message:"Invalid Email"})
        }

        if(password.length < 6){
            return res.status(400).json({success:false,message:"password must be at least 6 characters"});
        }

        const existingUserByEmail = await User.findOne({email:email})
        if(existingUserByEmail){
            return res.status(400).json({success:false,message:"email already exists"});
        }

        const existingUserByUsername = await User.findOne({username:username})
        if(existingUserByUsername){
            return res.status(400).json({success:false,message:"Username already exists"});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashePassword = await bcryptjs.hash(password , salt);
        // 123456 => #^%^&^879804#

        const PROFILE_PICS = ["avatar1","avatar2","avatar3"];

        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            email,
            password:hashePassword,
            username,
            image,         
        })

        
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({success:true, user:{
                ...newUser._doc,
                password: "",
            },
            })  



    } catch (error) {
        console.log("Error in signin Controller", error.message);
        res.status(500).json({success:false, message:"Internal sever error"});
    }
}

export async function login(req,res){
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({success:false,message:"Invalid credentials"})
        }
        
        const ispasswordCorrect = await bcryptjs.compare(password , user.password);
        if(!ispasswordCorrect){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            success:true,
            user:{
                ...user._doc,
                password: ""
            },
        })  
        
    } catch (error) {
        console.log("Error in Login Controller", error.message);
        res.status(500).json({success:false, message:"Internal sever error"}); 
    }        
}

export async function logout(req,res) {
    try{
        res.clearCookie("jwt-netflix");
        res.status(200).json({success:true, message:"logout successfully"});
    }
    catch(err){
        console.log("error in logout controller", err.message);
        res.status(500).json({success:false, message:"Internal sever error"});
        
    }
}