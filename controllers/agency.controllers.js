const Auth = require("../models/Auth")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { checkEmpty } = require("../utils/checkEmpty")
const { upload } = require("../utils/upload")
const cloudinary = require("../utils/cloudinary")
const { IO } = require("../socket/socket")
const Booking = require("../models/Booking")



exports.getAllAgencyAdmin = async (req, res) => {
    try {
        const result = await Auth.find({ role: "agency-admin" })
        res.json({ message: "Agency-admin Fetch Success", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

exports.updateAgencyProfile = async (req, res) => {
    try {
        upload(req, res, async err => {
            if (err) {
                return res.status(400).json({ message: "Multer Error", error: err })
            }
            const { services, agencyName, name, email, mobile } = req.body
            const { isError, error } = checkEmpty({ services, agencyName, name, email, mobile })
            if (isError) {
                return res.status(400).json({ message: "All Fields Required", error })
            }
            let hero = []
            if (req.file) {
                const { secure_url } = await cloudinary.uploader.upload(req.file.path)
                hero = secure_url
            }
            await Auth.findByIdAndUpdate(req.user, { services, agencyName, hero, name, email, mobile })
            const result = await Auth.find()
            IO.emit("agency-profile-update", result)
            res.json({ message: "Agency Profile Update Success" })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

exports.getAllAgencyBookings = async (req, res) => {
    try {
        const result = await Booking.find().populate("professionalId").populate("customerId")
        const arr = []
        for (let i = 0; i < result.length; i++) {
            if (result[i].professionalId && result[i].professionalId.agencyAdminId?.toString() === req.user.toString()) {
                arr.push(result[i])
            }
        }
        res.json({ message: "Agency Booking Fetch Success", result: arr })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



exports.fetchAgency = async (req, res) => {
    try {
        const result = await Auth.find({ _id: req.user })
        res.json({ message: "Agency Fetch Success", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

exports.activeAgencyProfessionals = async (req, res) => {
    try {
        const { id } = req.params
        const { isActive } = req.body
        await Auth.findByIdAndUpdate(id, { isActive })
        const result = await Auth.find()
        IO.emit("profess-agency-active", result)
        res.json({ message: "professionals Active/De-Active Success" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }
}
