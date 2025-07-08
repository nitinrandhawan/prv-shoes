const mongoose = require('mongoose')


const connectdb = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected Successfully')
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectdb