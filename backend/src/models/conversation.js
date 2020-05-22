const mongoose = require('mongoose')


const conversationSchema = new mongoose.Schema({
    sender : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{toJSON: {virtuals: true}})

conversationSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'conversation'
})




const Conversation = new mongoose.model('Conversation',conversationSchema)

module.exports = Conversation