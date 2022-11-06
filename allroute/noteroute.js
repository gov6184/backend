let express=require("express")
let {nmodal}=require("../allmodal/notemodal")
let nroute=express.Router()
let jwt=require("jsonwebtoken")
let validator=(req,res,next)=>{
    if(req.headers.authorization){
        let val=req.headers.authorization.split(" ")[1]
        console.log(val)
        jwt.verify(val,process.env.secretkey,(err,val)=>{
            if(err)res.status(300).send("try again")
            req.email=val["email"]
           
            next()
        })
    }else{
        res.send("someting went wrong")
    }

}
nroute.get("/note",validator,async(req,res)=>{
    console.log(req.email)
    let val=await nmodal.find({email:req.email})
    res.send(val)
})
nroute.post("/note/create",validator,async(req,res)=>{
    let{todo}=req.body;
    let newnote=new nmodal({
        email:req.email,
        todo,
    })
    await newnote.save()
    res.send("new note saved")
})
nroute.delete("/note/:noteid",validator,async(req,res)=>{
    console.log(req.params.noteid)
    let val=await nmodal.findOne({id:req.params.noteid})
    if(val["email"]==req.email){
        let info=await nmodal.findOneAndDelete({id:req.params.noteid})
        res.send("note deleted")
    }else{
        console.log(val["email"],req.email)
        res.send("you cannot delete this note ")
    }
})
nroute.patch("/note/:noteid",async(req,res)=>{
    console.log(req.params.noteid)
    let val=await nmodal.findOne({id:req.params.noteid})
    if(val["email"]==req.email){
        nmodal.findByIdAndUpdate({id:req.params.noteid}, {$set:req.body},(err,val)=>{
            if(err){
                res.status(300).send("someting went wrong")}
                else{
                    res.send("updated")
                }
        })
        
    }else{
        console.log(val["email"],req.email)
        res.send("you cannot update this note ")
    }
})
nroute.put("/note/:noteid",async(req,res)=>{
    console.log(req.params.noteid)
    let val=await nmodal.findOne({id:req.params.noteid})
    if(val["email"]==req.email){
        nmodal.findByIdAndUpdate({id:req.params.noteid}, {$set:req.body},(err,val)=>{
            if(err){
                res.status(300).send("someting went wrong")}
                else{
                    res.send("changed")
                }
        })
        
    }else{
        console.log(val["email"],req.email)
        res.send("you cannot change this note ")
    }
})
module.exports={
    nroute
}