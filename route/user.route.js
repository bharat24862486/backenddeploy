const express = require("express")
const userModel = require("../module/user.model")
const bcrypt = require('bcrypt');

const userRouter = express.Router()

userRouter.get("/", async (req, res) => {
    try {
        let data = await userModel.find()
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

userRouter.post("/register", async (req, res) => {
    let { email, password, gender, name } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (hash) {
                let data = new userModel({email,gender,name,password:hash})
                await data.save()
                res.send("data added successfully")
            } else{
                res.send(err.message)
            }
        });

    } catch (error) {
        res.send(error)
    }
})

module.exports = userRouter