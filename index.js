const express =require("express");
const { connection } = require("./Config/db");
const { userRouter } = require("./Routes/userRouter");
const { flightRouter } = require("./Routes/flightsRouter");
const { bookingRouter } = require("./Routes/bookingRoute");
const { dashboardRouter } = require("./Routes/dashboardROute");

const app=express()
const port=6060
app.use(express.json())

// app.use("/",(req,res)=>{
//     res.send("Home Page")
// })

app.use("/user",userRouter)
app.use("/flight",flightRouter)
app.use("/booking",bookingRouter)
app.use("/dashboard",dashboardRouter)

app.listen(port,async()=>{
    try{
        await connection
        console.log("Connected to MongoDB")

    }catch(err){
        console.log(err)
        console.log("Not Connected to DB")
    }
    console.log(`Server is Running at port ${port}`)
})