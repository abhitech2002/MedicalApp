const mongoose = require('mongoose')

// Schema for Doctor information
const doctorSchema = new mongoose.Schema({
    userId:{
        type: String
    },
    firstname:{
        type: String,
        required:[true, 'first name is require']
    },
    lastname:{
        type: String,
        required:[true, 'Last name is require']
    },
    phone:{
        type: String,
        required:[true, 'Phone is required']
    },
    email:{
        type: String,
        required:[true, 'email is required']
    },
    website:{
        type: String
    },
    address:{
        type: String,
        required:[true, 'address is required']
    },
    specialization:{
        type: String,
        required: [true,'Specialization is required']
    },
    experience:{
        type: String,
        required: [true,'Experience is Required']
    },
    feesPerCunsaltation:{
        type: Number,
        required:[true, 'Fees is required']
    },
    timing:{
        type:Object,
        required: [true, 'work timing is required']
    }
},{timestamps:true}) // timestamps to capture time every time it use

const doctorModel = mongoose.model('users', doctorSchema)
module.exports = doctorModel