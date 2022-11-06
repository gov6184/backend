let mong=require("mongoose")
require("dotenv").config()
let connect=mong.connect(process.env.url)
module.exports={
    connect
}