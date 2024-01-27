const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true,"First Name is required"],
        trim: true,
    },
    lastName:{
        type: String,
        required: [true,"Last Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(val){
                if(val.endsWith("@gmail.com")){
                    return true;
                }
                return false;
            },
            message: "Only gmails are allowed"
        }
    },

    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique:true,
        trim: true,
        validate: {
            validator: function(val){
                return /^\d{10}$/.test(val);
            },
            message: `{VALUE} is not a valid mobile number (enter 10 digit mobile number)`
        }
    }

})

const User = mongoose.model("User",userSchema);

module.exports = User;