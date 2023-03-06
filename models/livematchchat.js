const mongoose = require('mongoose')
const express=require('express')
const chatSchema = new mongoose.Schema({
    id:{
        type:String,
    },
    textmessage:[
        {
            text:{
                type:String
            }
        }
    ]

})
module.exports = mongoose.model('chats', chatSchema)