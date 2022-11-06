let mong=require("mongoose")
let nmodal=mong.model("allnote",mong.Schema({
    id:{type:Number,default:Math.random},
    email:{type:String,required:true},
    todo :{type:String,required:true},
    date:{type:Date ,default:Date.now}
}))
module.exports={
    nmodal
}