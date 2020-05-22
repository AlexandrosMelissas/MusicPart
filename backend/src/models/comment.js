const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    song : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Song'
    },
    comment : {
        type: String,
        required: true
    },
    // createdAt : {
    //      type: Date,
    //      required: true
    //     },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{timestamps:true})

const Comment = new mongoose.model('Comment',commentSchema)

module.exports = Comment