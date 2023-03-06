const express=require('express');
const router=express.Router();
const sechdule=require('../models/sechdule')
router.get('/',async(req,res)=>{
    
    const data=JSON.parse(decodeURIComponent(req.query.data))
    res.render('sechdule.ejs',{data:data});
})


module.exports=router;