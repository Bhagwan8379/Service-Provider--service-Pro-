const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    adminId: { type: mongoose.Types.ObjectId, ref: "auth" },
    agencyAdminId: { type: mongoose.Types.ObjectId, ref: "auth" },
    role: {
        type: String, enum: ["agency-admin", "admin", "customer", "painter",
            "plumber", "electritian", "farmer", "cleaning-services",
            "gardener", "ac-technician", "carpenter"], default: "customer"
    },
    experties: { type: String },
    agencyName: { type: String },
    hourlyRate: { type: String },
    location: { type: String },
    available: { type: String },
    hero: { type: String },
    skills: { type: [String] },
    isActive: { type: Boolean, default: true },
    isBooked: { type: Boolean, default: false },

    services: { type: [String] },

}, { timestamps: true })

module.exports = mongoose.model("auth", authSchema)






