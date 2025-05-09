import mongoose from "mongoose";


export const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    }
    ,image:{
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comments'
        }
    ],
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'likes'
        }
    ]
})

const postModel = mongoose.model('posts', postSchema);

export default postModel;