const express = require("express")
const { loginController, registerController, authController, applyDoctorController } = require("../controller/userCtrl")
const authMiddleware = require("../middleware/authMiddleware")

// router
const router = express.Router()

// login post
router.post('/login', loginController)

// register post
router.post('/register', registerController)

// Authentication
router.post('/getUserData', authMiddleware, authController)

// apply-doctor
router.post('/apply-doctor', authMiddleware, applyDoctorController)


module.exports = router