const Auth = require("../models/Auth")
const { checkEmpty } = require("../utils/checkEmpty")
const { upload } = require("../utils/upload")
const cloudinary = require("../utils/cloudinary")
const { IO } = require("../socket/socket")
const Booking = require("../models/Booking")





exports.getAllAgencyProfessionals = async (req, res) => {
    try {
        const result = await Auth.find({ agencyAdminId: req.user })
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

exports.updateProfessionalsProfile = async (req, res) => {
    try {
        upload(req, res, async err => {
            if (err) {
                return res.status(400).json({ message: "Multer Error", error: err })
            }
            const { agencyName, hourlyRate, location, available, skills, experties, name, email, mobile } = req.body
            const { isError, error } = checkEmpty({ agencyName, hourlyRate, location, available, skills, experties, name, email, mobile })
            if (isError) {
                return res.status(400).json({ message: "All Fields Required", error })
            }
            let hero = []
            if (req.file) {
                const { secure_url } = await cloudinary.uploader.upload(req.file.path)
                hero = secure_url
            }
            await Auth.findByIdAndUpdate(req.user, { agencyName, hourlyRate, location, available, hero, skills, experties, name, email, mobile })
            const result = await Auth.find()
            IO.emit("Professiona-Profile-Update", result)
            res.json({ message: "Profsssional Profile Update Success" })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

exports.getProfessional = async (req, res) => {
    try {
        const result = await Auth.findOne({ _id: req.user })
        if (result.isActive === false) {
            return res.status(400).json({ message: "Cannpot Access Profile,Your Account Blocked By Admin " })
        }
        res.json({ message: "Professionals Fetch Success", result })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Erro" })

    }
}

exports.fetchProfessionalBookHistory = async (req, res) => {
    try {

        const isFound = await Auth.findOne({ _id: req.user })
        if (isFound.isActive === false) {
            return res.status(400).json({ message: "Cannot Access Bookings, Your Account Blocked By Admin" })
        }
        const result = await Booking.find({ professionalId: req.user }).populate("professionalId").populate("customerId")
        console.log(result);

        // if (!result.isActive) {
        //     return res.status(400).json({ message: "Cannot access History , Your Account Blockd By Admin" })
        // }
        res.json({ message: "Booking fetch Succes", result })
        // console.log(result);

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

exports.updateBookingRequest = async (req, res) => {
    try {
        const { id } = req.params
        const { isAccept } = req.body

        await Booking.findByIdAndUpdate(id, { isAccept })
        const result = await Booking.find()
        IO.emit("book-accept/reject", result)
        res.json({ message: "Booking update Success" })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal Server Error" })

    }
}
