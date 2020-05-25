const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Like = require('../models/like')
const Song = require('../models/song')


router.post('/api/song/:id/like', auth, async (req,res) => {
        const findLike = await Like.findOne({ owner : req.user._id, song: req.params.id})

        if(findLike) {
            return res.status(400).send({ error: 'You have already liked this song.'})
        }
        const like = new Like({
            song: req.params.id,
            owner: req.user._id
        })
    try {

        await like.save()

        const song = await Song.findById(req.params.id)
        song.likes++
        await song.save()

        res.send()
  
    } catch (e) {
        res.status(400).send(e)
    }

})

router.post('/api/song/:id/unlike', auth, async (req,res) => {
try {
    const like = await Like.findOne({ owner : req.user._id})

    if(!like) {
        return res.status(400).send({error : 'You have already unliked this song.'})
    }
    
    await Like.findOneAndDelete({song: req.params.id})

    const song = await Song.findById(req.params.id)
    song.likes--
    await song.save()

    res.send()

} catch (e) {
    res.status(400).send(e.message)
}
})

router.get('/api/song/:id/check_like', auth, async (req,res) => {

    try {

        const like = await Like.findOne({ owner : req.user._id,song: req.params.id})

        if(like) {
            return res.send({ liked : true})
        }

        res.send({ liked : false})

    } catch (e) {
        res.status(400).send(e)
    }


})







module.exports = router