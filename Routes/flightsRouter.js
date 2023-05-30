const express=require("express");
const { FlightModel } = require("../Model/flightModel");

const flightRouter=express.Router();

// get 
flightRouter.get("/",async(req,res)=>{
    const q=req.query;
    try{
        const flight=await FlightModel.find(q)
        res.status(200).send(flight)
    }catch(err){
        return res.status(403).send({message:err.message})
    }
})

// get by id
flightRouter.get("/:id",async(req,res)=>{
    const ID=req.params.id;
    try{
        const flight=await FlightModel.findOne({_id:ID})
        res.status(200).send(flight)
    }catch(err){
        return res.status(403).send({message:err.message})
    }
})

// post 
flightRouter.post("/",async(req,res)=>{
    const data=req.body;
    try{
        const flight=new FlightModel(data)
        await flight.save()
        res.status(201).send({message:"flight Details added successfully"})
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

// update by id  
flightRouter.patch("/:id",async(req,res)=>{
    const ID=req.params.id;
    const data=req.body
    try{
        const flight=await FlightModel.findByIdAndUpdate({_id:ID},data)
        res.send({message:"flight Details Updated successfully"})
    }catch(err){
        return res.status(403).send({message:err.message})
    }
})

// delete by id  
flightRouter.delete("/:id",async(req,res)=>{
    const ID=req.params.id;
    try{
        const flight=await FlightModel.findByIdAndDelete({_id:ID})
        res.status(202).send({message:"flight Details Deleted successfully"})
    }catch(err){
        return res.status(403).send({message:err.message})
    }
})

module.exports={
    flightRouter
}