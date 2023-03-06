const express=require('express')
const router=express.Router()
const news=require('../models/news')
const moment=require('moment')
router.get('/',async(req,res)=>{
    const data=await news.find({}).sort({date:1});
    const sortedData = data.sort((a, b) => {
        return moment(a.date, "DD-MM-YYYY").valueOf() - moment(b.date, "DD-MM-YYYY").valueOf();
      });
      
    res.render('discuss.ejs',{newsdata:sortedData});
})
module.exports=router