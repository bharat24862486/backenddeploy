const express = require("express")
const postModel = require("../module/post.model")

const postRoute = express()

postRoute.get("/", async (req, res) => {
    let { device, device1, devide2 } = req.query


    try {
        
        if (device) {
            let data = await postModel.find({ device: device })
            res.send(data)
        } else if(device1) {
            let data = await postModel.find({ $or: [{ device: device1 }, { device: devide2 }] })
            res.send(data)
        } else{
            let data = await postModel.find()
            res.send(data)
        }

    } catch (error) {
        res.send({ "err": error })
    }
})

postRoute.post("/addpost", async (req, res) => {
    let body = req.body
    console.log(body)
    try {
        let data = new postModel(body)
        await data.save()
        res.send({ "msg": "data added successfully" })
    } catch (error) {
        res.send({ "err": error })
    }
})


postRoute.patch("/update/:id", async (req, res) => {
    let { id } = req.params
    let body = req.body

    try {
        let data = await postModel.findByIdAndUpdate({ _id: id }, body)
        res.send({ "msg": "post updated successfully" })
    } catch (error) {
        res.send({ 'err': error })
    }
})


postRoute.delete("/delete/:id", async (req, res) => {
    let { id } = req.params

    try {
        let data = await postModel.findByIdAndDelete({ _id: id })
        res.send({ "msg": "post deleted successfully" })
    } catch (error) {
        res.send({ 'err': error })
    }
})

module.exports = postRoute