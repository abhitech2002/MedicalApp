const express = require("express")
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController,deleteAllNotificationController, getAllDoctorsController } = require("../controller/userCtrl")
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

// Notofication for doctor
router.post('/get-all-notification', authMiddleware, getAllNotificationController)

// Deleting Notofication for doctor
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController)

// Get all doctor
router.get('/getAllDoctors',  getAllDoctorsController)


module.exports = router