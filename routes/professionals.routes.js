const { getProfessional, updateProfessionalsProfile, fetchProfessionalBookHistory, updateBookingRequest } = require("../controllers/professionals.controller")
const { professionalProtected, } = require("../middlewares/Protected")
const router = require("express").Router()



router
    .get("/professional-fetch", professionalProtected, getProfessional)
    .put("/professional-profile-update", professionalProtected, updateProfessionalsProfile)
    .get("/professional-booking", professionalProtected, fetchProfessionalBookHistory)
    .put("/booking-update/:id", professionalProtected, updateBookingRequest)



module.exports = router