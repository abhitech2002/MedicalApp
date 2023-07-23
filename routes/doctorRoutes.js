const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { getDoctorInfoController, updateProfileController } = require('../controller/doctorCtrl')

const router = express.Router()

//Post single doc info
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController)

//post update profile
router.post('/updateProfile', authMiddleware, updateProfileController)

module.exports = router
