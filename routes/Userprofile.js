const express=require('express')
const router=express.Router();
const multer=require('multer')
const fs=require('fs')
const path=require('path')
const profileinfo=require('../models/profileinfo')
// setting up the multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/profile')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const filter=function(req,file,cb){
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
       return cb(new Error('Only image files are allowed!'), false);
     }
     cb(null, true);
 }
const upload = multer({ storage: storage,fileFilter:filter })

// setting up the routes
router.get('/',async(req,res)=>{
    res.render('userinfo.ejs')
})
router.post('/',upload.single('profileimage'),async(req,res)=>{
    try {
        
        
        const userinfo=new profileinfo({
            email:req.query.email,
            description:req.body.description,
            image:req.file.filename,
            facebook:req.body.fblink,
            twitter:req.body.twitterlink,
            insta:req.body.instalink,
            
        })
        userinfo.save(function(err){
          if(err){
            console.log(err)
          }
          else{
            res.redirect(`/profile/?email=${req.query.email}`)
          }
        })
        
        
    } catch (error) {
        console.log(error)
    }

})
module.exports=router;