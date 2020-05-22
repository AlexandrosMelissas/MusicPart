const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Comment = require('../models/comment')
const Song = require('../models/song')


router.post('/api/song/:id/comment', auth, async (req,res) => {

    const comment = new Comment({
        song : req.params.id,
        comment: req.body.comment,
        owner: req.user._id,
        // createdAt : req.body.createdAt
    })

    try {
        await comment.save()
        await Comment.populate(comment,{path: 'owner', populate: {path: 'profile',select : '_id'}},function(err,doc) {
            return res.status(201).send(doc)
        })

        // res.status(201).send(comment)

    } catch (e) {
        res.status(400).send(e.message)
    }
})


router.get('/api/song/:id/comment', async (req,res) => {
    try {
        let totalPages = 0
        const comments = await Comment.find({song : req.params.id})
        totalPages = Math.ceil(comments.length / 9)

        
        await Comment.find({song : req.params.id})
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip))
        .sort({'createdAt': -1})
        .populate({path: 'owner',populate: {path:'profile',select: '_id'}})
        .exec((err,docs) => {
           res.send({
               comments : docs,
               totalPages
           })
        }) 


    } catch (e) {
        res.status(400).send({error: e.message})
    }
})

router.delete('/api/song/:song_id/comment/:comm_id', auth, async (req,res) => {

    try {
        const comment = await Comment.findOneAndDelete({
            _id : req.params.comm_id,
            song: req.params.song_id,
            owner: req.user._id
        })

        if(!comment) {
           return res.status(404).send()
        }
        
        res.send(comment)

    } catch (e) {
        res.status(400).send({error : e.message})
    }

} )


module.exports = router