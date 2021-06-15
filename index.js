const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app=express();

dotenv.config(); //for acces env variables

//connect to dg
mongoose.connect(process.env.dbconnect,{ useUnifiedTopology: true },()=>console.log("Connected to DB !!!!! "));

//middleware body parser
app.use(express.json());

//import router
const authRout=require('./Router/auth');
const postRout=require('./Router/Post');

//route middleware
app.use('/api/user', authRout);
app.use('/api/posts', postRout);

// app.listen(5000,()=>console.log("Server Started Running "));

// app.listen(5000);
const port=process.env.PORT || 5000;
app.listen(port,()=>{
 console.log("listening to 5000 ");
});