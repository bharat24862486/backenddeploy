const express = require("express")
const connection = require("./db")
const userRouter = require("./route/user.route")
const cors = require("cors")
const Auth = require("./middleware/auth.middleware")
const postRoute = require("./route/post.route")
require("dotenv").config()
const app = express()

app.use(express.json())
app.use(cors())



app.use("/user", userRouter)

app.use(Auth)

app.use("/posts", postRoute)

app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("connected to the db")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running at port ${process.env.port}`)
})