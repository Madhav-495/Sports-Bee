const express=require('express')
const router=express.Router()
router.get('/',async(req,res)=>{
    res.render('teampage.ejs')
})

module.exports=router
