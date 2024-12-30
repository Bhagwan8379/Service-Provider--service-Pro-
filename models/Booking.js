const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    customerId: { type: mongoose.Types.ObjectId, ref: "auth", required: true },
    professionalId: { type: mongoose.Types.ObjectId, ref: "auth", required: true },
    date: { type: Date, required: true },
    reason: { type: String, required: true },
    location: { type: String, required: true },
    isAccept: { type: String, enum: ["accept", "reject", "pending", "cancel"], default: "pending" },
}, { timestamps: true })

module.exports = mongoose.model("booking", bookingSchema)