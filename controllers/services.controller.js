const Auth = require("../models/Auth");


exports.fetchAllPlumbers = async (req, res) => {
    try {
        const result = await Auth.find({ role: "plumber" })
        res.json({ message: "Plumbers Fetch Success", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }


}
exports.fetchAllelectricians = async (req, res) => {
    try {
        const result = await Auth.find({ role: "electritian" })
        res.json({ message: "Plumbers Fetch Success", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }

}
exports.fetchAllAcTechnicians = async (req, res) => {
    try {
        const result = await Auth.find({ role: "ac-technician" })
        res.json({ message: "ac-technician Fetch Success", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }

}
exports.fetchAllPaitnters = async (req, res) => {
    try {
        const result = await Auth.find({ role: "painter" })
        res.json({ message: "painter Fetch Success", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }

}
exports.fetchAllFarmers = async (req, res) => {
    try {
        const result = await Auth.find({ role: "farmer" })
        res.json({ message: "farmer Fetch Success", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal Server Error" })

    }

}
exports.fetchAllCleaners = async (req, res) => {
    try {
        const result = await Auth.find({ role: "cleaning-services" })
        res.json({ message: "Cleaners Fetch Success", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal Server Error" })

    }

}
exports.fetchAllGardener = async (req, res) => {
    try {
        const result = await Auth.find({ role: "gardener" })
        res.json({ message: "gardener Fetch Success", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }

}
exports.fetchAllCarpenter = async (req, res) => {
    try {
        const result = await Auth.find({ role: "carpenter" })
        res.json({ message: "carpenter Fetch Success", result })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }

}