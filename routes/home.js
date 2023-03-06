const express=require('express');
const router=express.Router()
const profile=require('../models/profileinfo')
const storage=require('node-sessionstorage')
const session=require('express-session')

router.get('/',async(req,res)=>{
    // const userdata=await profile.findOne({email:req.query.email});
    const data=JSON.parse(decodeURIComponent(req.query.data))
    
    res.render('home.ejs',{data:data});

    
})

module.exports=router;