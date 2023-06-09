const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    device:{type:String,required:true},
    userID:{type:String,required:true},
    userName:{type:String,required:true}

},{versionKey:false})

const postModel = mongoose.model("/post",postSchema)

module.exports = postModel
