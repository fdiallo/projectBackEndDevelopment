
// Dependencies
const express = require("express")
const app = express()
require("dotenv").config()

const userRoutes = require("./routes/api/userRoutes.js")
const projectRoutes = require("./routes/api/projectRoutes.js")
const taskRoutes = require("./routes/api/taskRoutes.js")

//const routes = require("./routes/api/*")
const users = require('./models/User.js')
const task = require('./models/Task.js')

const { connectDB } = require("./config/connection.js")

connectDB()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())     // Middleware to parse JSON bodies

// Routes - // Mount the routers
app.use("/", userRoutes);
app.use("/", projectRoutes);
app.use("/", taskRoutes);

// Port
const PORT = process.env.PORT
app.listen(PORT, () => { console.log(`Server listening on Port: ${PORT}`) })

