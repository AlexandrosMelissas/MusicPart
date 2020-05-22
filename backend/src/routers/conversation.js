const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Conversation = require('../models/conversation')




router.get('/api/conversation', auth, async (req,res) => {

    try {
        const conversations = await Conversation.find({
            $or: [
                { sender : req.user._id },
                { recipient : req.user._id}
            ]
        }).populate({path: 'sender', populate: {path: 'profile',select: 'name avatar'}})
          .populate({path: 'recipient', populate: {path: 'profile',select: 'name avatar'}})
        

        if(!conversations) {
            return res.status(404).send()
        }

        res.send(conversations)

    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

router.get('/api/conversation/:id', auth, async (req,res) => {

    try {

       const conversation = await Conversation.findById(req.params.id)
            
        if(!conversation) {
            return  res.status(404).send()
         }
        
        res.send(conversation)
       


    } catch (error) {
        res.status(400).send({error:error.message})
    }

})







module.exports = router