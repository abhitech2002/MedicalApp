const express = require('express')
const authMiddleware = require("../middleware/authMiddleware")
const { getAllUsersController, getAllDoctorsController } = require('../controller/adminCtrl')

const router = express.Router()

// Get Method
router.get('/getAllUsers',  authMiddleware, getAllUsersController)

router.get('/getAllDoctors',  authMiddleware, getAllDoctorsController)

module.exports = router