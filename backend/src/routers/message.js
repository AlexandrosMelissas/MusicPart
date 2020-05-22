const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Message = require('../models/message')
const Conversation = require('../models/conversation')
const multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 7000000
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(mp3|wav)$/)) {
            cb(new Error('File must be mp3 or wav format'))
        }
        cb(undefined,true)
    }
})

router.post('/api/message', auth, async (req,res) => {

    try {
        const foundConversation = await Conversation.findOne({ 
           $or : [
            {sender : req.user._id, recipient: req.body.recipient},
            {sender : req.body.recipient, recipient: req.user._id }
           ] 
        })

       if(foundConversation){
            const message = await new Message({
                ...req.body,
                sender: req.user._id,
                conversation : foundConversation._id
            })
            
        await message.save()

        
       await Message
      .populate(message,{path: 'sender'},function(err,doc) {
          console.log(doc)
         return res.send(doc)
      })
        return
       }

        const conversation = await new Conversation({
           sender: req.user._id,
           recipient: req.body.recipient
       })

       const message = await new Message({
        ...req.body,
        sender: req.user._id,
        conversation : conversation._id
    })
    
      await message.save()
      await conversation.save()

      await Message
      .populate(message,{path: 'sender'},function(err,doc) {
          console.log(doc)
          res.send(doc)
      })


    } catch (e) {
        res.status(400).send({error:e.message})
    }
})

router.get('/api/message/:id/file', async (req,res) => {
    try {
        const message = await Message.findById(req.params.id)

        if(!message) {
            return res.status(404).send()
        }
        
        res.set('Content-type','audio/mpeg')
        res.send(message.file)

    } catch (e) {
        res.status(400).send({error:e.message})
    }
})


router.post('/api/message/file', auth, upload.single('upload'), async (req,res) => {

    try {
        var body = JSON.parse(req.body.message)
        const foundConversation = await Conversation.findOne({ 
            $or : [
                {sender : req.user._id, recipient: body.recipient},
                {sender: body.recipient, recipient : req.user._id }
            ]
        })

        if(foundConversation){
             const message = await new Message({
                 ...body,
                 sender: req.user._id,
                 file : req.file.buffer,
                 conversation : foundConversation._id
             })
             
         await message.save()

         await Message
         .populate(message,{path: 'sender',populate: {path: 'profile',select: 'name'}},function(err,doc) {
            return res.send(doc)
         })
           return
        }

        const conversation = await new Conversation({
            sender: req.user._id,
            recipient: req.body.recipient
        })
 
        const message = await new Message({
         ...req.body,
         sender: req.user._id,
         file: req.file.buffer,
         conversation : conversation._id
     })
     
       await message.save()
       await conversation.save()

       await Message
       .populate(message,{path: 'sender',populate: {path: 'profile',select: 'name'}},function(err,doc) {
          return res.send(doc)
       })
        
       res.send(message)
    } catch(e) {


    }

})

router.get('/api/message/conversation/:id', auth, async (req,res) => {

    try {
        const messages = await Message.find({ conversation : req.params.id })
        .populate({path: 'sender', populate: {path: 'profile', select: 'name'}})
        .exec((error,docs) => {
            if(!docs) {
                return res.status(404).send()
            }
             res.send(docs)
         })

        
    } catch (e) {

        res.status(400).send({error:e.message})

    }
})






module.exports = router