const express=require('express');
const router=express.Router();
const Users=require('../models/Userdata')
const bcrypt=require('bcrypt');
const storage=require('node-sessionstorage')
const session=require('express-session')
router.get('/',(req,res)=>{
    res.render('login.ejs');
})
router.post('/',async(req,res)=>{
    const Userdata=await Users.findOne({email:req.body.email});
    if(Userdata){
        const checkpassword=await bcrypt.compare(req.body.password,Userdata.password);
        if(checkpassword){
            const user_object={
                name:Userdata.name,
                email:Userdata.email,
                phone:Userdata.phone,
                image:Userdata.image
            }
            res.redirect(`/profile/?data=${encodeURIComponent(JSON.stringify(user_object))}`);
            
            
        }
        else{
            console.log("wrong password");
        }
    }
    else{
        console.log("Email not registered with us");
    }
})
module.exports=router;
