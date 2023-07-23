const doctorModel = require("../model/doctorModel")
const getDoctorInfoController = async(req, res) => {
    try{
        const doctor = await doctorModel.findOne({userId:req.body.userId})
        res.status(200).send({
            success: true,
            message:"Doctor data fetch successfully.",
            data: doctor
        })

    }catch(error){
        console.log(error)
        res.send(500).send({
            success: true,
            message: "Error in Fetching Doctor Details."
        })
    }
}

// Update Doctor Profile
const updateProfileController = async(req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId}, req.body)
        res.status(201).send({
            success: true,
            message: "Doctor Profile Update",
            data: doctor,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: "Doctor Profile Update issue",
            error
        })
    }
}

module.exports= {getDoctorInfoController, updateProfileController}