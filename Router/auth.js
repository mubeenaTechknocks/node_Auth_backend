const router=require('express').Router();
const User = require('../models/User');
const {registerValidation,loginValidation}=require('../validation');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');




router.post('/register',async (req,res)=>{
  
  const { error }=registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
//check email exist
  const emailExist=await User.findOne({email:req.body.email});
  if(emailExist) return res.status(400).send('Email Alreay Exist');

  //encrypt password using  npm install bcryptjs
  const salt=await bcrypt.genSalt(10);
  const hasedpassword=await bcrypt.hash(req.body.password,salt);

  const user=new User({
    name:req.body.name,
    email:req.body.email,
    password:hasedpassword,

  });
  try {
      const saveduser= await user.save();
      res.send({user:user._id});
      
  } catch (error) {
      res.status(400).send(error);
  }
});

//login

 router.post('/login',async (req,res)=>{
    const { error }=loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
  //check email exist
    const usercheck= await User.findOne({email:req.body.email});
    if(!usercheck) return res.status(400).send('User with this email is not found');
// check password os correct
    const validpass= await bcrypt.compare(req.body.password,usercheck.password);
    if(!validpass) return res.status(400).send("Invalid password");

//create and assign token
    const token=jwt.sign({_id:usercheck.id},process.env.tokensecret);
    res.header('auth-token',token).send(token);

    // res.send('Successfully Logged in');
 });


module.exports=router;