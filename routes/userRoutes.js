const express = require("express")
const { loginController, registerController, authController } = require("../controller/userCtrl")
const authMiddleware = require("../middleware/authMiddleware")

// router
const router = express.Router()

// login post
router.post('/login', loginController)

// register post
router.post('/register', registerController)

// Auth
router.post('/getUserData', authMiddleware, authController)
module.exports = router