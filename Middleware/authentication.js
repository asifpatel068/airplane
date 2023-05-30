const jwt=require("jsonwebtoken");

const authenticate=(req,res)=>{
    const token=req.headers.authentication
    if(token){
        return res.status(403).send({message:"please login"})
    }
    jwt.verify(token,"normal",(err,decoded)=>{
        if(err){
            return res.status(403).send({message:"Login again"})
        }else{
            next()
        }
    })
}

module.exports={
    authenticate
}