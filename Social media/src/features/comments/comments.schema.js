import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    like:
    [{
         type: mongoose.Schema.Types.ObjectId,
        ref: 'likes'
    }]
})

const commentModel = mongoose.model('comments',commentSchema);

export default commentModel;