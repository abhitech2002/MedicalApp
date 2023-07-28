const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { getDoctorInfoController, updateProfileController, getDoctorByIdController } = require('../controller/doctorCtrl')

const router = express.Router()

//Post single doc info
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController)

//post update profile
router.post('/updateProfile', authMiddleware, updateProfileController)

// Post Get Single Doc Info
router.post('/getDoctorById', getDoctorByIdController)

module.exports = router
