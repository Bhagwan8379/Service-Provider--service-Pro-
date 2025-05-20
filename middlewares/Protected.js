const jwt = require("jsonwebtoken")

// Admin Protected

exports.adminProtected = async (req, res, next) => {
    const { Admin } = req.cookies

    if (!Admin) {
        return res.status(401).json({ message: "Cookie Not Found" })
    }
    jwt.verify(Admin, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error);
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decode.userId
    })
    next()
}

// Professional Protected

exports.professionalProtected = async (req, res, next) => {
    const { professional } = req.cookies
    if (!professional) {
        return res.status(401).json({ message: "Cookie Not Found" })
    }
    jwt.verify(professional, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error);
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decode.userId
    })
    next()
}

// Agency Protected

exports.agencyAdminProtected = async (req, res, next) => {
    const { AgencyAdmin } = req.cookies
    // console.log(AgencyAdmin, "hello");

    if (!AgencyAdmin) {
        return res.status(401).json({ message: "Cookie Not Found" })
    }
    jwt.verify(AgencyAdmin, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error);
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decode.userId
        // console.log(req.user, "userId");

    })
    next()
}

// customer Protected
exports.customerProtected = async (req, res, next) => {
    const { customer } = req.cookies

    if (!customer) {
        return res.status(401).json({ message: "Cookie Not Found" })
    }
    jwt.verify(customer, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            ``
            console.log(error);
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decode.userId

    })
    next()
}

