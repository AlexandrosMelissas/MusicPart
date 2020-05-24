const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Song = require('../models/song')
const path = require('path')
const Profile = require('../models/profile')
const multer = require('multer')
const Comment = require('../models/comment')



const uploadSong = multer({
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

const upload2 = multer({
    limits: {
        fileSize: 7000000
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(jpg|png)$/)) {
            cb(new Error('File must be jpg or png format'))
        }
        cb(undefined,true)
    }
})




router.post('/api/song', auth, uploadSong.single('upload'), async (req,res) => {
      var body = JSON.parse(req.body.song)
      body = {
          ...body,
          owner : req.user._id,
          file : req.file.buffer
      }
      const song = new Song(body)
      await song.save()
      res.send()
}, (error,req,res,next) => {
    res.status(400).send({ error: error.message})
})


router.post('/api/song/:id/image', upload2.single('upload'), async (req,res) => {

    try {
        const song = await Song.findById(req.params.id)

        if(!song) {
            return res.status(404).send()
        }

        song.image = req.file.buffer

        await song.save()

        res.send()

    } catch (error) {

        res.status(400).send({error:error.message})

    }
})

router.get('/api/song/me', auth, async (req,res) => {

    try {
    const songs = await Song.find({ owner : req.user._id})
    if(!songs) {
        return res.status(404).send()
    }
    
    res.send(songs)
} catch (e) {
    res.status(400).send(e)
}
})

router.get('/api/song/profile/:id',async (req,res) => {
    try {
        const profile = await Profile.findById(req.params.id)
        const songs = await Song.find({owner : profile.owner}).sort({ createdAt : -1 }).limit(4)

        res.send(songs)

    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

router.get('/api/song/:id/songFile', async (req,res) => {
    try {
        const song = await Song.findById(req.params.id)
        if(!song) {
           return res.status(404).send()
        }

        res.set('Content-type','audio/mpeg')
        res.send(song.file)

    } catch (e) {

        res.status(400).send(e)
    }
})

router.get('/api/song/:id', async (req,res) => {
    try {

        const song = await Song.findById(req.params.id)
        await song.populate({path: 'comments',populate: {path: 'owner',select:'_id name'}})
        .populate({path: 'owner', select: '_id name',populate: {path: 'profile',select:'_id'}}).execPopulate()
        if(!song) {
            return res.status(404).send()
        }

        res.send(song)

    } catch (e) {

        res.status(400).send({error:e.message})

    }
})

router.get('/api/songs/top', async (req,res) => {

    try {
        const top_songs = await Song.find().sort({likes : -1}).limit(8)

        res.send(top_songs)

    } catch (e) {
        res.status(400).send({error:e.message})
    }

})

router.get('/api/song/:id/image', async (req,res) => {

    try {
        const song = await Song.findById(req.params.id)
        if(!song) {
            return res.status(404).send()
        }

        res.set('Content-Type','image/jpeg')
        res.send(song.image)

    } catch (e) {
        res.status(400).send({error: e.message})
    }

})

router.get('/api/song', async (req,res) => {

    try {
      const songs  = await Song.find({})
      .populate({path: 'owner',select: 'name'}).exec((error,docs)=> {
          res.send(docs)
      })
       

    } catch (e) {

        res.status(400).send(e.message)

    }
})

router.delete('/api/song/:id', auth, async (req, res) => {

    try {
        const song = await Song.findOneAndDelete({
            _id : req.params.id,
            owner: req.user._id
        })


        if(!song) {
            return res.status(404).send()
        }

        await Comment.deleteMany({
            song:req.params.id
        })

        res.send(song)

    } catch (e) {

        res.status(400).send({error:e.message})

    }
})

module.exports = router