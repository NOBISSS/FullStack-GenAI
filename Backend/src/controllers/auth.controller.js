const userModel=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken')
const tokenBlackListModel=require('../models/blacklist.model');
/**
 * @name registerUserController
 * @description Register a new User,expectes username,email
 * @access Public
 */

async function registerUserController(req,res){
    try{
        const {username,email,password}=req.body;

        if(!username || !email || !password){
            return res.status(400).json({
                message:"Please Provide Username,email and password"
            })
        }

        const isUserAlreadyExists=await userModel.findOne({
            $or:[{ username },{ email }]
        })

        if(isUserAlreadyExists) {
            /**isUserAlreadyExists.username==username */
            return res.status(400).json({
                message:"Account Already Exists with this email address or username"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const user=await userModel.create({
            username,
            email,
            password:hashedPassword
        });

        const token=jwt.sign(
            {id:user._id,username:user.username},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.cookie("token",token);

        res.status(201).json({
            message:"User Registered Successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        })
    }catch(err){
        console.log(err);
    }
}


/**
 * @name loginUserController
 * @description login a existing User,expectes username or email,password
 * @access Public
 */
async function loginUserController(req,res){
    try{
        const {email,password}=req.body

        const user=await userModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }

        const isPasswordValid=await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalid Email or Password"
            })
        }

        const token=jwt.sign(
            {id:user._id,username:user.username},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.cookie("token",token);

        res.status(200).json({
            message:"User LoggedIn Successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        })
    }catch(err){
        console.log(err);
    }
}

/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */
async function logoutUserController(req,res){
    const token=req.cookies.token;

    if(token){
        await tokenBlackListModel.create({token})
    }

    res.clearCookie("token");

    res.status(200).json({
        message:"User logged out successfully"
    });
}

/**
 * @name getMeController
 * @description get the current logged in user details
 * @access Private
 */

async function getMeController(req,res){
    const user=await userModel.findById(req.user.id);

    // if(!user){
    //     return res.status(404).json({
    //         message:"User not found please register first"
    //     })
    // }

    res.status(200).json({
        message:"User details fetched Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

module.exports={
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}
