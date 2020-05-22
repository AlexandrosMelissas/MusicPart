const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    song : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})


const Like = new mongoose.model('Like',likeSchema)

module.exports = Like