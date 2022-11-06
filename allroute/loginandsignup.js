let epxress=require("express");
let lsroute=epxress.Router()
let bycrypt=require("bcrypt")
let {smodal}=require("../allmodal/signupmodal")
let jwt=require("jsonwebtoken")
require("dotenv").config()
lsroute.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    
    let userdetails=await smodal.findOne({email:email})
    if(userdetails){
        bycrypt.compare(password,userdetails["password"],async(err,result)=>{
            if(err)res.status(401).send("please try again after some time")
            console.log(result)
            if(result){
                jwt.sign({email:email},process.env.secretkey,(err,data)=>{
                    if(err)res.status(400).send("please login")
                    res.send({token:data})
                    
                })
                
            }
    
        })
    }else{
        res.status(401).send("plese signup")
    }
    
})
lsroute.post("/signup",async(req,res)=>{
    let {email,password}=req.body
    let val=await smodal.findOne({email})
    if(val){
        res.status(300).send("user already preasent with same email please login")
    }else{
        bycrypt.hash(password,5,async(err,hashval)=>{
            if(err)res.status(401).send("please try again after some time")
            let newuser= new smodal({
                email,
                password:hashval
            })
            await newuser.save()
            res.send("signup successful")
        })
    }
 
})
module.exports={
    lsroute
}