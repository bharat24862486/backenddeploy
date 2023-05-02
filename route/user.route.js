const express = require("express")
const userModel = require("../module/user.model")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

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
                let data = new userModel({ email, gender, name, password: hash })
                await data.save()
                res.send("data added successfully")
            } else {
                res.send(err.message)
            }
        });

    } catch (error) {
        res.send(error)
    }
})

userRouter.post("/login", async (req, res) => {
    let { email, password } = req.body
    let check = await userModel.findOne({ email: email })
    try {
        if (check) {
            bcrypt.compare(password, check.password, async (err, result) => {
                if (result) {
                    jwt.sign({ userID: check._id, userName: check.name }, "bharat", function (err, token) {
                        if (token) {
                            res.send({ "msg": "user login successfull", token })
                        } else {
                            res.send({ "err": err.message })
                        }
                    });
                } else {
                    res.send({ "err": "wrong credentials" })
                }
            });
        } else {
            res.send({"err":"accound does't exists"})
        }
    } catch (error) {
        res.send({"err":error})
    }
})

module.exports = userRouter