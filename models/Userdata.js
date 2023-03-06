const mongoose = require('mongoose')
const bcrypt=require('bcrypt');
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cnfpassword:{
        type:String,
        require:true,
    },
    image:{
        type:String,
    }

})
UserSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,10);
        this.cnfpassword=await bcrypt.hash(this.cnfpassword,10);
    }
    next();
})



    module.exports = mongoose.model('Users', UserSchema)