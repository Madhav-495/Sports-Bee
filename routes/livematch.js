const express=require('express')
const router=express.Router()

router.get('/',(req,res)=>{
  const data=JSON.parse(decodeURIComponent(req.query.data))
  
  res.render('livematches.ejs',{data:data});
})

module.exports=router
