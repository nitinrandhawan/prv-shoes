const express = require("express")
const Router = require("./Routes/MainRouter")
const cors = require("cors")
const connectdb = require('./mongo/db')
require("dotenv").config()
const PORT = process.env.PORT || 8000
const app = express()
connectdb()

// const Options = {
//     origin:["http://localhost:3000"]
// }


app.get('/',(req,res)=>{
    res.send('I am From Prv Backend')
})

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.set(express.static("./Public"))
app.use("/Public", express.static("Public"))
app.use('/api', Router)


app.listen(PORT, () => {
    console.log(`Server Is Running at ${PORT}`);
})