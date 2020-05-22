const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const Profile = require('../models/profile')
const auth = require('../middleware/auth')

router.post('/api/register', async (req, res) => {
    const user = new User(req.body)
    const profile = new Profile({
        owner : user._id
        })

    try {
        await user.checkDuplicates(user.username,user.email)
        const token = await user.generateAuthToken()
        await user.save()
        await profile.save()
        res.status(201).send({user,token})  


    } catch (e){ 

        res.status(400).send(e)
    }

})

router.post('/api/login', async (req,res) => {

    try {
        const user = await User.checkCredentials(req.body.username,req.body.password)
        const token = await user.generateAuthToken()

        await user.save()

        res.send({user,token})

    } catch (e){

        res.status(400).send({error: e.message})

    }

})

router.post('/api/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {

            return token.token !== req.token

        })

        await req.user.save()
        
        res.send()

    } catch (error){

        res.status(500).send(error.message)

    }
})

router.get('/api/users/:id', auth, async (req,res) => {
    try {

        const user = await User.findById(req.params.id)
        
        if(!user){
           return res.status(404).send()
        }

        res.send(user)

    } catch (e){

        res.status(400).send(e)

    }
})

module.exports = router