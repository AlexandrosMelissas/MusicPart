const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Profile = require('../models/profile')
const multer = require('multer')


const upload = multer({
    limits: {
        fileSize: 4000000
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('File must be jpg or png format'))
        }
        cb(undefined,true)
    }
})

router.get('/api/profile/me', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({owner: req.user._id})
        await profile.populate('owner').execPopulate()        
        res.send(profile)

    } catch (e){

        res.status(400).send(e)

    }
})

router.get('/api/profile', async (req,res) => {

    try {
            if(req.query.name) {
                await Profile.find({})
                .select('-avatar -city -age -instruments')
                .populate({
                    path:'owner',
                    select: 'name type', 
                    match : { name : { $regex: '.*' + req.query.name + '.*' } }
                })
                .exec((err,docs) => {
                   return res.send(docs)
               })
            } else {

                await Profile.find({})
                .select('-avatar -city -age -instruments')
                .populate({
                    path:'owner',
                    select: 'name type', 
                })
                .exec((err,docs) => {
                   return res.send(docs)
               })
            }

         

    } catch (error) {
        res.status(400).send({error:error.message})
    }

})

router.get('/api/profile/:id', async (req,res) => {

    try {
         await Profile.findById(req.params.id)
        .select('-avatar')
        .populate({path: 'owner',populate : {path: 'comments',options : {sort:'-createdAt',limit:4},populate :{path: 'song',select:'title'}}})
        .exec((err,profile) => {

            if(!profile) {
                return res.status(404).send()
            }

            res.send(profile)

        })

       

    } catch(error) {

        res.status(400).send({error:error.message})

    }
    
})

router.patch('/api/profile', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['age','city','instruments']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates!'})
    }
    try {
       const profile = await Profile.findOne({owner: req.user._id}).select('-avatar')
       updates.forEach((update) => {
           profile[update] = req.body[update]
       })

       await profile.save()

      await profile.populate('owner').execPopulate()

      res.send(profile)

    } catch (error){

        res.status(400).send({error:error.message})

    }
})

router.post('/api/profile/avatar', auth, upload.single('avatar'), async (req ,res) => {

    try {
        const profile = await Profile.findOne({owner : req.user._id})

        if(!profile) {
           return res.status(404).send()
        }

        profile.avatar = req.file.buffer

        await profile.save()

        res.send()


    } catch (e) {
        res.status(400).send({error:e.message})
    }

})

router.get('/api/profile/:id/avatar', async (req,res) => {
    
    try {
        const profile = await Profile.findById(req.params.id)

        if(!profile) {
           return res.status(400).send()
        }

        res.set('Content-Type','image/jpeg')
        res.send(profile.avatar)

    } catch (e) {
        res.status(400).send({error:e.message})
    }
})


module.exports = router