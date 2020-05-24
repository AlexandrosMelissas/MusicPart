const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    likes : {
        type: Number,
        default: 0
    },
    link: {
        type: String
    },
    image : {
        type: Buffer,
        default: fs.readFileSync(path.resolve((__dirname), '../assets/img/song.jpg'))
    },
    file: {
        type: Buffer,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{timestamps:true},{toJSON: {virtuals: true},toObject: {virtuals:true}})


songSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'song'
})

songSchema.methods.toJSON = function(){
    const songObject = this.toObject()
    
    delete songObject.file
    if(songObject.owner) {
        delete songObject.owner.tokens
        delete songObject.owner.password
    }
    return songObject

}

const Song = new mongoose.model('Song', songSchema)

module.exports = Song