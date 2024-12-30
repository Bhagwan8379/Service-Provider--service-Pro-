const Auth = require("../models/Auth")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { checkEmpty } = require("../utils/checkEmpty")
const { IO } = require("../socket/socket")
const { upload } = require("../utils/upload")
const cloudinary = require("../utils/cloudinary")
const Booking = require("../models/Booking")


exports.getAllAdmin = async (req, res) => {
    try {
        const result = await Auth.find({ role: "admin" })
        res.json({ message: "Admin Fetch Success", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

exports.getAllAdminProfessionals = async (req, res) => {
    try {
        const result = await Auth.find({ adminId: req.user })
        const arr = []
        for (let i = 0; i < result.length; i++) {
            if (result[i].role === "farmer" || result[i].role === "painter" ||
                result[i].role === "plumber" || result[i].role === "electritian" ||
                result[i].role === "cleaning-services" || result[i].role === "gardener" ||
                result[i].role === "ac-technician" || result[i].role === "carpenter"
            ) {
                arr.push(result[i])
            }
        }
        res.json({ message: "Professionals Fetch Success", result: arr })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

exports.updateAdminProfile = async (req, res) => {
    try {
        upload(req, res, async err => {
            if (err) {
                return res.status(400).json({ message: "Multer Error", error: err })
            }
            const { mobile } = req.body
            const { isError, error } = checkEmpty({ mobile })
            if (isError) {
                return res.status(400).json({ message: "All Fields Required", error })
            }
            let hero
            if (req.file) {
                const { secure_url } = await cloudinary.uploader.upload(req.file.path)
                hero = secure_url
            }
            await Auth.findByIdAndUpdate(req.user, { hero, mobile })
            const result = await Auth.find()
            IO.emit("admin-Profile-Update", result)
            res.json({ message: "Admin Profile Update Success" })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

exports.getAllProfessionalsBookings = async (req, res) => {
    try {
        const result = await Booking.find().populate("professionalId").populate("customerId")
        res.json({ message: "Booking Fetch Success", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

exports.activeAgency = async (req, res) => {
    try {
        const { id } = req.params
        const { isActive } = req.body
        await Auth.findByIdAndUpdate(id, { isActive })
        const result = await Auth.find()
        IO.emit("ageyc-active-Deactive", result)
        res.json({ message: "Agency Active/De-Active Success" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

exports.activeAdminProfessionals = async (req, res) => {
    try {
        const { id } = req.params
        const { isActive } = req.body
        await Auth.findByIdAndUpdate(id, { isActive })
        const result = await Auth.find()
        IO.emit("profess-admin-active", result)
        res.json({ message: "professionals Active/De-Active Success" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

exports.activeCutomers = async (req, res) => {
    try {
        const { id } = req.params
        const { isActive } = req.body
        await Auth.findByIdAndUpdate(id, { isActive })
        const result = await Auth.find()
        IO.emit("customer-active", result)
        res.json({ message: "Customer Active/De-Active Success" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }
}