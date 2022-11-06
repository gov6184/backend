let express=require("express")
let app=express()
let {connect}=require("./config/db")
let {lsroute}=require('./allroute/loginandsignup')
let {nroute}=require("./allroute/noteroute")
app.use(express.json())
app.use(lsroute)
app.use(nroute)
app.listen(8080,async()=>{
    try {
        await connect
        console.log("connected")
    } catch (error) {
        console.log("not connected")
    }
    console.log("connected to port 8080")
})