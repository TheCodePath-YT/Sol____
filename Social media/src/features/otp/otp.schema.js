import mongoose, { Mongoose } from "mongoose";

const otpSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
    ,recipient:{
        type: String,
        required: true
    },
    otp:{
        type: Number,
        required: true
    }
   
})

const otpModel = mongoose.model('otps',otpSchema)

export default otpModel;