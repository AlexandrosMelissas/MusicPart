const mongoose = require('mongoose')
const fs = require('fs')

const profileSchema = new mongoose.Schema({
    age : {
        type : Number,
        trim: true,
        default: 15
    },
    city: {
        type: String,
        default: ''
    },
    instruments: [{
        instrument : {
            type: String
        }
    }],
    avatar : {
        type: Buffer,
        default: fs.readFileSync('../frontend/src/assets/images/default.jpg')
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Profile = mongoose.model('Profile',profileSchema)

module.exports = Profile