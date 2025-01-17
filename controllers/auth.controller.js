const Auth = require("../models/Auth")
const bcrypt = require("bcryptjs")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const { checkEmpty } = require("../utils/checkEmpty")
const { IO } = require("../socket/socket")
const sendEmail = require("../utils/email")

//  Admin Registration

exports.registerAdmin = async (req, res) => {
    try {
        const { email, password, mobile, name, } = req.body
        const { isError, error } = checkEmpty({ name, email, password })
        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Provide Strong Password" })
        }

        if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
            return res.status(400).json({ message: "Invalid Mobile Number" })
        }
        const isFound = await Auth.findOne({ email })
        if (isFound) {
            return res.status(409).json({ message: "Email  Already Exist Use ANother One" })
        }
        const hash = await bcrypt.hash(password, 10)
        await Auth.create({ name, email, mobile, role: "admin", password: hash, })
        res.json({ message: "Admin Register Success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        const isFound = await Auth.findOne({ email })
        if (!isFound) {
            return res.status(401).json({ message: "Email Not Found 👎" })
        }
        const isVerify = await bcrypt.compare(password, isFound.password)
        if (!isVerify) {
            return res.status(401).json({ message: "Password Not Match 👎" })
        }
        if (isFound.isActive === false) {
            return res.status(400).json({ message: "Cannot Login, Your Account Blockd By Admin" })
        }
        const token = jwt.sign({ userId: isFound._id, name: isFound.name }, process.env.JWT_KEY, { expiresIn: "15d" })
        if (isFound.role === "admin") {
            res.cookie("Admin", token, { maxAge: 1000 * 60 * 60 * 60, httpOnly: true })
        } else if (isFound.role === "agency-admin") {
            res.cookie("AgencyAdmin", token, { maxAge: 1000 * 60 * 60 * 60, httpOnly: true })
        } else if (isFound.role === "customer") {
            res.cookie("customer", token, { maxAge: 1000 * 60 * 60 * 60, httpOnly: true })
        } else if (
            isFound.role === "electritian" ||
            isFound.role === "painter" ||
            isFound.role === "plumber" ||
            isFound.role === "farmer" ||
            isFound.role === "carpenter" ||
            isFound.role === "cleaning-services" ||
            isFound.role === "gardener" ||
            isFound.role === "ac-technician"
        ) {
            res.cookie("professional", token, { maxAge: 1000 * 60 * 60 * 60 * 60, httpOnly: true })
        }
        const result = await Auth.find()
        IO.emit("login-success", result)
        res.json({
            message: "Login Success", result: {
                _id: isFound._id,
                name: isFound.name,
                email: isFound.email,
                mobile: isFound.mobile,
                role: isFound.role
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.logoutAdmin = async (req, res) => {
    try {
        res.clearCookie("Admin")
        res.json({ message: "Admin Logout Success" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

//  PROFESSIONAL REGISTER

exports.agencyProfessionalRegister = async (req, res) => {
    try {
        const { email, password, name, mobile, role } = req.body
        const { isError, error } = checkEmpty({ name, email, password })
        const isFound = await Auth.findOne({ email })
        if (isFound) {
            return res.status(409).json({ message: "Email Already Registered" })
        }

        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Provide Strong Password" })
        }

        if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
            return res.status(400).json({ message: "Invalid Mobile Number" })
        }
        const hash = await bcrypt.hash(password, 10)

        sendEmail({
            email: email,
            subject: "Registration Successful - Welcome to Our Platform!",
            message: `
                Dear User,
                Congratulations! You have successfully registered on our platform.
        
                Here are your login credentials:
                - Email: ${email}
                - Password: ${password}

                Best regards,
                The Agency Team
            `
        });

        await Auth.create({ name, email, password: hash, role, mobile, agencyAdminId: req.user })
        res.json({ message: "Professional Register Success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

exports.adminProfessionalRegister = async (req, res) => {
    try {
        const { email, password, name, mobile, role } = req.body
        const { isError, error } = checkEmpty({ name, email, password })
        const isFound = await Auth.findOne({ email })
        if (isFound) {
            return res.status(409).json({ message: "Email Already Registered" })
        }

        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Provide Strong Password" })
        }

        if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
            return res.status(400).json({ message: "Invalid Mobile Number" })
        }

        const hash = await bcrypt.hash(password, 10)

        sendEmail({
            email: email,
            subject: "Registration Successful - Welcome to Our Platform!",
            message: `
                Dear User,
        
                Congratulations! You have successfully registered on our platform.
        
                Here are your login credentials:
                - Email: ${email}
                - Password: ${password}

                Best regards,
                The Admin Team
            `
        });
        await Auth.create({ name, email, password: hash, role, mobile, adminId: req.user })
        res.json({ message: "Professional Register Success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal Server Error" })

    }
}
exports.professionalLogout = async (req, res) => {
    res.clearCookie("professional")
    res.json({ message: "Professional LogOut Success" })
}


// Agency-Admin Register

exports.registerAgencyAdmin = async (req, res) => {
    try {
        const { email, password, mobile, name, role } = req.body
        const { isError, error } = checkEmpty({ name, email, password })
        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Provide Strong Password" })
        }

        if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
            return res.status(400).json({ message: "Invalid Mobile Number" })
        }
        const isFound = await Auth.findOne({ email })
        if (isFound) {
            return res.status(409).json({ message: "Email  Already Exist Use ANother One" })
        }
        const hash = await bcrypt.hash(password, 10)

        sendEmail({
            email: email,
            subject: "Registration Successful - Welcome to Our Platform!",
            message: `
            Dear Platform,
    
            Congratulations! You have successfully registered on our platform.
    
            Here are your login credentials:
            - Email: ${email}
            - Password: ${password}

            Best regards,
            The Admin Team
        `
        });
        await Auth.create({ name, email, mobile, role, password: hash })
        res.json({ message: "Agency-admin Register Success" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

exports.logoutAgencyAdmin = async (req, res) => {
    try {
        res.clearCookie("Agency-Admin")
        res.json({ message: "Agency-admin LogOut Success" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }
}


// Customer register

exports.customerRegister = async (req, res) => {
    try {
        const { email, password, mobile, name } = req.body
        const { isError, error } = checkEmpty({ name, email, password })
        const isFound = await Auth.findOne({ email })
        if (isFound) {
            return res.status(409).json({ message: "Email  Already Exist Use ANother One" })
        }
        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Provide Strong Password" })
        }

        if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
            return res.status(400).json({ message: "Invalid Mobile Number" })
        }

        const hash = await bcrypt.hash(password, 10)
        sendEmail({
            email: email,
            subject: "Registration Successful - Thank You To Connecting US!",
            message: `
                Dear Customer,
        
                Congratulations! You have successfully registered on our platform.

                I Hope  You have Getting Good Work From Our Platform

                Best regards,
                The Agency Team
            `
        });
        await Auth.create({ name, email, mobile, password: hash })
        res.json({ message: "Customer Register Success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

exports.customerLogout = async (req, res) => {
    try {
        res.clearCookie("customer")
        res.json({ message: "Customer Register Success" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })

    }
}