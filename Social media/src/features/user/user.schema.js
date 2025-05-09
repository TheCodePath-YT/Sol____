import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    requests:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    friends:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ]
})

const userModel = mongoose.model('users', userSchema)

export default userModel
