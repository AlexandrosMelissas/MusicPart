const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    message: {
        type: String
    },
    file : {
        type: Buffer
    },
    recipient : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    conversation : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Conversation'
    }
},{timestamps:true})


messageSchema.methods.toJSON = function() {
    var obj = this.toObject()
    if(!obj._id){
        delete obj.file
        return obj
    } else {
        return obj
    }

}

const Message = new mongoose.model('Message',messageSchema)

module.exports = Message