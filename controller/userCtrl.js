const userModel = require("../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const doctorModel = require('../model/doctorModel')
// Register
const registerController = async(req, res) => {
    try{
        const existingUser = await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({message : "User Already Exist",success: false})
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        req.body.password = hashPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({message:'Register Successfully', success: true})

    }catch(error){
        console.log(error)
        res.status(500)
        .send({
            success:false, 
            message: `Register Controller ${error.message}`
        })
    }
}

// Login
const loginController = async(req, res) => {
    try{
        const user = await userModel.findOne({email: req.body.email})
        if(!user){
            return res.status(200).send({ message: "User Not Found", success:false})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(200).send({message:"Invalid email or password", success:false})
        }
        const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn:'1d'})
        res.status(200).send({message:"Login Successfully", success:true, token})
    }catch(error){
        console.log(error)
        res.status(500).send({message:`Error in login Ctrl ${error.message}`})
    }
}

const authController = async(req, res) =>{
    try{
        const user = await userModel.findById({_id:req.body.userId})
        user.password = undefined;
        if(!user){
            return res.status(200).send({
                message: "User Not Found",
                success: false
            })
        }else{
            res.status(200).send({
                success:true,
                data:user
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            message: "Auth Error",
            success: false,
            error
        })

    }
}

// Apply Doctor
const applyDoctorController = async(req, res) =>{
    try{
        // Getting Doctor data
        const newDoctor = await doctorModel({...req.body, status:'pending'}) // initial status pending 
        await newDoctor.save() 
        // Getting Admin for notification
        const adminUser = await userModel.findOne({isAdmin: true})
        const notification = adminUser.notification
        notification.push({
            type: 'apply-doctor-request',
            message:`${newDoctor.firstname} ${newDoctor.lastname} was applied for doctor account`,
            data:{
                doctorId:newDoctor._id,
                name: newDoctor.firstname+ ' '+ newDoctor.lastname,
                onClickPath:'/admin/doctors' // redirecting 
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id , {notification})
        res.status(201).send({
            success:true,
            message:'Doctor account successfully'
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:'Error While Applying for Doctor.'
        })
    }

}

// Notification
const getAllNotificationController = async(req, res) =>{
    try{
        // Getting User
        const user = await userModel.findOne({_id:req.body.userId})
        const seen_notification = user.seen_notification
        const notification = user.notification
        // Pushing Notification
        seen_notification.push(...notification)
        user.notification = []
        user.seen_notification = notification
        const updatedUser = await user.save()
        res.status(200).send({
            success: true,
            message:'all notification marked as read',
            data:updatedUser,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:'Error in Notification.'
        })
    }
}

// Delete Notification
const deleteAllNotificationController = async(req, res) => {
    try{
        const user= await userModel.findOne({_id:req.body.userId})
        user.notification = []
        user.seen_notification = []
        const updatedUser = await user.save()
        updatedUser.password = undefined
        res.status(200).send({
            success: true,
            message: `Notification Deleted Successfully`,
            data: updatedUser
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:'Error in Deletion of Notification.'
        })
    }
}

// all doctors
const getAllDoctorsController = async(req, res) => {
    try {
        const doctors = await doctorModel.find({status:'approved'})
        res.status(200).send({
            success: true,
            message: "Doctor list fetch successfully.",
            data: doctors
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:'Error While Fetching Doctor.'
        })
    }
}

module.exports = {loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController}