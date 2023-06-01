const express = require('express');
const router = express.Router();
const User = require("../models/user");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post("/registration",async(req,res)=>{
    try{
        let email = req.body.email.toLowerCase();
        if(!validator.isEmail(email)){
            return res.status(403).json({message:"Email is not valid"});
        }
        if(validator.isEmpty(req.body.password) || !validator.isLength(req.body.password,{min:5})){
            return res.status(403).json({message:"Password is not valid"});
        }
        const user = await User.find({email});
        if(user.length>0){
            return res.status(403).json({message:"User Already Exists !!!"});
        }else{
            const hashPassword = await bcrypt.hash(req.body.password,12);
            const newUser = new User({
                email,
                password:hashPassword,
                name: req.body.name
            });
            const result = await newUser.save();
            const token = await jwt.sign({userId:result._id,email:result.email},"somesupersecretkey");
            res.status(200).json({token,userID:result._id,email:result.email,message:'success'});
        }
    }catch(err){
        res.status(404).json({message:'fail'});
    }
})

router.post("/login",async(req,res)=>{
    try{
        let errors = [];
        if(!validator.isEmail(req.body.email)){
            errors.push({message:"Email is not valid"});
        }
        if(validator.isEmpty(req.body.password) || !validator.isLength(req.body.password,{min:5})){
            errors.push({message:"Password is not valid"});
        }
        if(errors.length>0){
            const error = new Error("Invalid input.");
            error.data = errors;
            error.code = 422;
            throw error
        }
        const user = await User.find({email:req.body.email});
        if(user.length>0){
            const isEqual = await bcrypt.compare(req.body.password,user[0].password);
            if(!isEqual){
                return res.status(403).json({error:'Wrong Credentials!!!'});
            }
            const token = await jwt.sign({userId:user[0]._id,email:user[0].email},"somesupersecretkey")
            return res.status(200).json({token,userID:user[0]._id,email:user[0].email,message:'success'});     
        }
        return res.status(200).json({error:"User Does Not Exists !!!"});
    }catch(err){
        res.status(404).json({message:'fail'});
    }
})
router.post("/checkAuth",async(req,res)=>{
    try{
        const user = await User.findById(req.body.userId);
        if(user){
            const token = await jwt.sign({userId:user._id,email:user.email},"somesupersecretkey");
            return res.status(200).json({token,userId:user._id,email:user.email,message:'success'});     
        }
        return res.status(200).json({error:"No Data Found !!!"});
    }catch(err){
        res.json({message:'fail'});
    }
})
router.post("/findUserWithEmailDomain",async(req,res)=>{
    try{
        const users = await User.find({email: {"$regex":req.body.emailDomain}});
        if(users?.length>0){
            return res.status(200).json({message:'Success',data:users.map(user=>{return{name:user.name,email:user.email}})});
        }
        return res.status(200).json({error:"No Data Found !!!"});
    }catch(err){
        console.log(err);
        res.json({message:'fail'});
    }
})

router.get("",async(req,res)=>{
    try{
        const users = await User.find({});
        if(users?.length>0){
            return res.status(200).json({message:'Success',data:users.map(user=>{return{name:user.name,email:user.email}})});
        }
        return res.status(200).json({error:"No Data Found !!!"});
    }catch(err){
        console.log(err);
        res.json({message:'fail'});
    }
})

module.exports = router;