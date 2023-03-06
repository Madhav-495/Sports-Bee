const mongoose = require('mongoose')
const SechduleSchema=new mongoose.Schema({
    trophy_name:{
        type:String,
    },
    match_info:{
        type:String,
        // such as india vs aus 3rd odi/test/t20
    },
    venue:{

    },
    date:{
        type:Date,
        
    },
    image:{
        type:String,
    }

})
module.exports = mongoose.model('Sechdules', SechduleSchema)