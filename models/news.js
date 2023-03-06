const mongoose=require('mongoose')
const newsSchema=new mongoose.Schema({
    image:{
        type:String,
    },
    heading:{
        type:String,
    },
    description:{
        type:String,
    },
    date:{
        type:String,
        default:new Date().toLocaleDateString(),
    }
})

module.exports=mongoose.model('news',newsSchema)