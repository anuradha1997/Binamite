
require('dotenv').config();
const mongoose=require('mongoose');
const express=require('express');
const app=express();
const router=express.Router();
app.use(express.json());
const jwt=require('jsonwebtoken');
const {userDetails} =require('../model/user');


router.post('/signup',async(req,res)=>{
    let user=new userDetails({
      username:req.body.username
    });
    await user.save();
    res.send('ok');
    
    })
    
    router.get('/userAccessToken',async(req,res)=>{
      let user=new userDetails({
        username:req.body.username
      });
      const accessToken=jwt.sign(user.username,process.env.ACCESS_TOKEN)
      res.json({accessToken:accessToken})
      })
    
      router.get('/post',authenticateToken,async(req,res)=>{
       res.json(uservalue);
     })
    

     ///authenticateToken//
    function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization']
    if(authHeader==null){
        console.log('unautherized')
        return res.sendStatus(401);
    }
    const token=authHeader.toString().split(' ')[1];
    if(token==null){
      return res.sendStatus(401);
    }
    
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
      if(err) return res.sendStatus(403);
      req.user=userDetails.username
      uservalue=user;
      next();
    })
    }
    
    exports.auth=authenticateToken;