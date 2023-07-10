const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required:[true, 'name is require']
    },
    email:{
        type: String,
        required:[true, 'Email is required']
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isDoctor:{
        type: Boolean,
        default: false
    },
    notification:{
        type: Array,
        default:[]
    },
    seen_notification:{
        type: Array,
        default: []
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel