const mongoose=require('mongoose')

const profileSchema=new mongoose.Schema({
    email:{
        type:String,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
    },
    facebook:{
        type:String,
    },
    twiter:{
        type:String,
    },
    insta:{
        type:String,
    }
    
})
module.exports = mongoose.model('profile', profileSchema)