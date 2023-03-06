const express=require('express');
const router=express.Router();
const Users= require('../models/Userdata')
router.get('/',(req,res)=>{
    // res.render('signup.ejs',{errormessage:req.flash('signuperror')});
    res.render('signup.ejs');
})
router.post('/',async(req,res)=>{
    
    const data=await Users.findOne({email:req.body.email})
    if(data){
        // user already exists before signup
        // handle the error
        console.log(data)
    }
    else{
        const userdata=new Users({
            name:req.body.name,
            phone:req.body.phonenumber,
            email:req.body.email,
            password:req.body.password,
            cnfpassword: req.body.cnfpassword
        })
        userdata.save(function(err){
            if(err){
                console.log(err);
            }
            else{
                
                res.redirect('/');
            }
        })
    }
})
    


module.exports=router;