const express=require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { UserModel } = require("../Model/userModel");

const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const userFind=await UserModel.findOne({email});
        if(userFind){
            return res.status(403).send({message:"User already exists"});
        }

        bcrypt.hash(password,5,async function (err,hasedPassword){
            if(err){
                return res.status(500).send({message:err.message})
            }
            try{
               const user=new UserModel({name,password:hasedPassword,email})
                 await user.save();
                 return res.status(201).send({message:"User Registered Successfully"})
            }catch(err){
                return res.status(403).send({message:err.message})
            }
           
        })
    }catch(err){
        return res.status(403).send({message:err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.findOne({email});
        if(user==null){
            return res.status(403).send({message:"User not registered"})
        }
        const hasedPassword=user?.password
        bcrypt.compare(password,hasedPassword,(err,result)=>{
            if(err){
                return res.status(500).send({message:err.message });
            }
            if(!result){
                return res.status(401).send({message:"Wrong Credential" });
            }
            console.log(user)
            const token =jwt.sign({name:user.name,id:user._id},"normal");
            res.status(201).send({message:"Login Sucessfull",token})

        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
})

module.exports={
    userRouter
}

