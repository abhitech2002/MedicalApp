const doctorModel = require('../model/doctorModel')
const userModel = require('../model/userModel')

const getAllUsersController = async(req, res) => {
    try{
            const users = await userModel.find({})
            res.status(200).send({
                success: true,
                message: 'Users Data List',
                data: users
            })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error While Fetching User',
            error
        })
    }

}

const getAllDoctorsController = async(req, res) => {
    try{
        const doctors = await doctorModel.find({})
            res.status(200).send({
                success: true,
                message: 'Doctors Data List',
                data: doctors
            })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error While Fetching Doctors',
            error
        })
    }

}

module.exports = {getAllDoctorsController, getAllUsersController}