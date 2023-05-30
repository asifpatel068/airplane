const express=require("express");
const { BookingModel } = require("../Model/bookingModel");

const bookingRouter=express.Router();

bookingRouter.post("/",async(req,res)=>{
    const payload=req.body;
    try{
        const adding=new BookingModel(payload)
        await adding.save()
        res.status(201).send({message:"flightBooked Successfully"})
    }catch(err){
        return res.status(500).send({message:err.message})
    }

})

module.exports={
    bookingRouter
}