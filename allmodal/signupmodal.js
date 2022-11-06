let mong=require("mongoose")
let smodal=mong.model("allnoteuser",mong.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true}
}))
module.exports={
    smodal
}