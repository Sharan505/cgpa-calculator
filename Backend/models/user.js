const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        required:true,
        type:String,
        trime:true
    },
    regNo:{
        required:true,
        type:Number,
        trime:true
    },
    password:{
        required:true,
        type:String
    }
});

const User = mongoose.model("User",userSchema);
module.exports=User;
