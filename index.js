const express = require("express")
const connection = require("./db")
const userRouter = require("./route/user.route")
const cors = require("cors")
require("dotenv").config()
const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("home")
})

app.use("/user", userRouter)

app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("connected to the db")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running at port ${process.env.port}`)
})