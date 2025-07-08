const mongoose = require("mongoose")

const getConnect =async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/shose")
        console.log("Database is locally connected");
    } catch (error) {
        console.log(error)
    }
}

getConnect()