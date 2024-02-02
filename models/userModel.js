const mongoose = require("mongoose");


let userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required: true,
    },
    lastname:{
        type:String,
        required:true
    },
    user_image:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ0groa4TIPGawvqv3iM3eibhHTyGbLxlTQR5QcAkjNg&s"
    },
    email:{
        type:String,
        required: true,
        unique: true,
        index:true
    },
    mobile:{
        type:String,
        required: true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required: true,
    },
    roles:{
        type:String,
        default:"user",
    },
    profession:{type:String, required:true},
    isblocked:{
        type:Boolean,
        default: false,
    },
    passwordChangedAt: Date,
    passwordResetToken:String,
    passwordResetExpires: Date,
    stripe_account_id:String,
    stripe_seller:{},
    stripesession:{},
},{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema)