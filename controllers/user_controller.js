const { generateToken } = require("../config/jwtToken");
const validateMongodbId = require("../config/validateMongoDbid");

const User = require("../models/userModel");

const asyncHandler = require("express-async-handler");

/** creat A User */

const registerAUser = asyncHandler(async (req, res) => {
    const email = req.body.email;

    const findUser = await User.findOne({email:email});
    // res.status(200).json(findUser);
    if(!findUser){
        /* create a User */
        const newUser = await User.create(req.body)
        res.status(201).json({
            status:true,
            statusCode:201,
            message:"User Account Successfully Created",
            payload:newUser
        })
    }else{
        throw new Error("User Already E xist")
    }

    console.log(email);
});

/* login a user*/
const loginUser = asyncHandler(async(req, res) => {
    const  {email, password} = req.body;

    // check if user exist
    const findUser = await User.findOne({email:email});
    if(findUser && (await findUser.isPasswordMatched(password))){
        res.status(200).json({
            status:true,
            statusCode:200,
            message: "Logged in Successfully",
            payload:{
                token:generateToken(findUser?._id),
                role:findUser?.roles,
                username: findUser?.firstname + " " + findUser?.lastname,
                user_image: findUser?.user_image,
            }
        });
    }else {
        throw new Error("Invalid Credentials");
    }
});


/** get all users */
const getAllUsers = asyncHandler(async(req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json({
            status:true,
            statusCode:200,
            message:"All user's feteched succcessfully",
            payload:allUsers
        });
    } catch (error) {
        throw new Error(error);
    };
});

/** get single user */
const getUser = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        console.log(user)

        if(!user){
            return res.status(404).json({
                statusCode:404,
                message:"user not found"
            })
        }

        return res.status(200).json({
            statusCode:200,
            message:"User's details found",
            user
        })
        

    } catch (error) {
        throw new Error(error);
    };
});

/** Update User */ 
 
const updateUser = asyncHandler(async(req, res) => {

    const { _id } = req.user;
    validateMongodbId(_id)

    try {
        const user = await User.findByIdAndUpdate(_id, req.body,{new:true});

        // if(!user){
        //     throw new Error("User does not exist")
        // }
      
        return res.status(200).json({
            status:true,
            message:"Profile Updated Successfully",
            user
        });

    } catch (error) {
        
        res.status(500).json({
            status:false,
            message:"An Error occured while updating the profile"
        });
    }
});

module.exports = {registerAUser, loginUser, getAllUsers, getUser, updateUser};

