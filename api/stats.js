const express=require('express')
const router=express.Router();
const stats=require('../models/playerstats')
// route name /api/stats
router.get('/',async(req,res)=>{
    const playername = req.query.name.replace(/\s/g,'');
    const query = { Name: { $regex: new RegExp(playername, "i") } };
    const statsdata = await stats.find(query);
    // console.log(statsdata)
    if(statsdata){
        // console.log(res.json(statsdata))
        res.json(statsdata);
    }
    else{
        console.log("nahi mila")
    }
})


module.exports=router