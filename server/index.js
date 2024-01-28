import express, { response } from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

// routes
import taskRoutes from "./routes/tasks.js"
import columnRoutes from "./routes/columns.js"
import userRoutes from "./routes/users.js"

// adding dotenv file
dotenv.config()
// connecting to mongoDb
connectDB()
// connecting to express
const app = express()

app.use(cors())

// parse the JSON
// it will allow us to accept Json data in request in body
app.use(express.json())

///////////
// routes /
///////////
app.use("/api/tasks", taskRoutes)
app.use("/api/columns", columnRoutes)
app.use("/api/user", userRoutes)

app.get("/", (req, resp) => {
  resp.send("Hello...!")
})

const PORT = process.env.PORT || 12345

app.listen(PORT, console.log(`Server Running on port ${PORT}`))