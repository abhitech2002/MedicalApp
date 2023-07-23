const express = require('express')
const authMiddleware = require("../middleware/authMiddleware")
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController } = require('../controller/adminCtrl')

const router = express.Router()

// Get Method for user
router.get('/getAllUsers',  authMiddleware, getAllUsersController)

// Get method for doctor
router.get('/getAllDoctors',  authMiddleware, getAllDoctorsController)

// acoount status
router.post('/changeAccountStatus',  authMiddleware, changeAccountStatusController)

module.exports = router