const router=require('express').Router();
const verify=require('./verifyToken');

router.get('/',verify,(req,res)=>{
     res.json({
          "Secret":"pro Works"
     })
});

module.exports=router;