import mongoose, { Mongoose } from "mongoose";

const likeSchema = new mongoose.Schema({
    like:{
        type: Boolean,
        required: true
    },
    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'category'
    },
    category:{
        type: String,
        enum: ['Post', 'Comment'],
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

const likeModel = mongoose.model('likes', likeSchema);

export default likeModel;