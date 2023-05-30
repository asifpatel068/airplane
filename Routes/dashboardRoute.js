const express=require("express");
const { BookingModel } = require("../Model/bookingModel");

const dashboardRouter=express.Router();

dashboardRouter.get("/",async(req,res)=>{
    const q=req.query;
    try{
        const data=await BookingModel.find(q)
        res.status(200).send(data)
    }catch(err){
        return res.status(403).send({message:err.message})
    }

})

module.exports={
    dashboardRouter
}