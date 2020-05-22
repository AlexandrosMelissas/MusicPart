const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    name : {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    email: {
        type : String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.default.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    tokens : [{
        token : {
            type: String,
            required: true
        }
    }]
},{toJSON: {virtuals:true},toObject: {virtuals:true}})


userSchema.methods.toJSON = function(){
    const userObject = this.toObject()
    
    delete userObject.password
    delete userObject.tokens

    return userObject

}

userSchema.virtual('profile',{
    ref: 'Profile',
    localField: '_id',
    foreignField: 'owner'
})


userSchema.virtual('comments',{
    ref: 'Comment',
    localField: '_id',
    foreignField: 'owner',
})


userSchema.methods.checkDuplicates = async (username,email) => {
    const existsUsername = await User.countDocuments({username})
    const existsEmail = await User.countDocuments({email})

    if(existsUsername>0){
        const error = {
            path : 'username',
            message: 'This username already exists.Please choose another one'
        }
        throw (error)
    }
    if(existsEmail>0){
        const error = {
            path : 'email',
            message: 'This email already exists.Please choose another one'
        }
        throw (error)
    }
}



userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()

})


userSchema.methods.generateAuthToken = async function() {

    const user = this
    const token = jwt.sign({_id : user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })

    return token

}

// Login authentication
userSchema.statics.checkCredentials = async (username,password) => {


    const user = await User.findOne({ username })

   if(!user){
       throw new Error('Credentials do not match')
   }
   const isMatched = await bcrypt.compare(password,user.password)

   if(!isMatched) {
       throw new Error('Credentials do not match')
   }

    return user

}

const User = mongoose.model('User', userSchema)

module.exports = User