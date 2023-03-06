const mongoose=require('mongoose')
const matchSchema=new mongoose.Schema({
    status:{
        type:String,
    },
    team1:{
        type:String,
    },
    image:{
        type:String,
    },
    team2:{
        type:String,
    },
    

})
module.exports=mongoose.model('matches',matchSchema)