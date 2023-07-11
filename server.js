const express = require("express")
const moragan = require("morgan")
const dotenv = require("dotenv")
const connectDB = require("./config/db")


// dotenv config
dotenv.config()

// Mongo DB connection
connectDB()

// Intsance of express
const app = express()

// Middleware
app.use(express.json())
app.use(moragan('dev'))

// routes 
app.use('/api/v1/user', require('./routes/userRoutes'))

app.use('/api/v1/admin', require('./routes/adminRoutes') )

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`server Running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`)
    // console.log("server is running at port 3000..")
}) 