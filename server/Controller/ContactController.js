const Contact = require("../Model/ContactModel")

exports.createRecord = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, email, phone, address, message } = req.body
        if (!name || !email || !phone || !message || !address) {
            return res.status(400).json({
                success: false,
                message: "Please Enter all Required fields"
            })
        }
        const newContact = new Contact({ name, email, phone, message, address })
        await newContact.save()
        res.status(200).json({
            success: true,
            message: "New Record created",
            data: newContact
        })
    } catch (error) {
        console.log(error);
    }
}


 exports.getRecord = async(req,res)=>{
    try {
        let data = await Contact.find()
        res.status(200).json({
            success:true,
            data:data
        })
    } catch (error) {
        console.log(error);
    }
}

exports.deleteRecord = async(req,res)=>{
    try {
        let data = await Contact.findOne({_id:req.params._id})
        await data.deleteOne()
        res.status(200).json({
            success:true,
          mess:"Record Deleted"
        })
    } catch (error) {
        res.status(500).json({
            success:true,
          mess:"Unauthorized Actavity"
        })
    }
}


