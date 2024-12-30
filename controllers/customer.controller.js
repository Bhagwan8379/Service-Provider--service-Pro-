const Auth = require("../models/Auth")
const Booking = require("../models/Booking")
const { IO } = require("../socket/socket")
const { checkEmpty } = require("../utils/checkEmpty")
const { upload } = require("../utils/upload")
const cloudinary = require("../utils/cloudinary")
const sendEmail = require("../utils/email")


exports.getAllCustomers = async (req, res) => {
    try {
        const result = await Auth.find({ role: "customer" })
        res.json({ message: "Customers Fetch Success", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }
}
exports.getCustomerProfile = async (req, res) => {
    try {
        const result = await Auth.findById(req.user)
        res.json({ message: "Customers Profile Fetch Success", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

exports.updateCustomerProfile = async (req, res) => {
    try {
        upload(req, res, async err => {
            if (err) {
                return res.status(400).json({ message: "Multer Error", error: err })
            }
            const { location, name, email, mobile } = req.body
            const { isError, error } = checkEmpty({ location, name, email, mobile })
            if (isError) {
                return res.status(400).json({ message: "All Fields Required", error })
            }
            let hero
            if (req.file) {
                const { secure_url } = await cloudinary.uploader.upload(req.file.path)
                hero = secure_url
            }
            await Auth.findByIdAndUpdate(req.user, { location, hero, name, email, mobile })
            const result = await Auth.find()
            IO.emit("Customer-Profile-Update", result)
            res.json({ message: "Customer Profile Update Success" })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

exports.getProfetionDetails = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Auth.findById(id)
        res.json({ message: "Profetion Details Fetched", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }
}



// Booking

exports.bookProfessional = async (req, res) => {
    try {
        const { date, reason, location, professionalId } = req.body
        const { isError, error } = checkEmpty({ date, reason, location, professionalId })
        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error })
        }
        const customer = await Auth.findOne({ _id: req.user })
        const professional = await Auth.findOne({ _id: professionalId })

        await sendEmail({
            email: customer.email,
            message: `your ORder is Placed Suucess Full  you booked a ${professional.role} its name is ${professional.name}`,
            subject: "You'r Booking Success!"
        })
        await sendEmail({
            email: professional.email,
            message: `You Have New Booking Request  ${customer.name} is booked YOu`,
            subject: "You HAve New Booking"
        })
        await Booking.create({ customerId: req.user, professionalId, date, reason, location })
        const result = await Booking.find()
        IO.emit("professional-Booked", result)
        res.json({ message: "Booking Success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

exports.fetchCustomerBookHistory = async (req, res) => {

    try {
        const result = await Booking.find({ customerId: req.user }).populate("professionalId")
        res.json({ message: "customer Booking fetch Success", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }

}


