const { getAllAgencyAdmin, updateAgencyProfile, fetchAgency,
    activeAgencyProfessionals, getAllAgencyBookings } = require("../controllers/agency.controllers")
const { getAllAgencyProfessionals } = require("../controllers/professionals.controller")
const { agencyAdminProtected } = require("../middlewares/Protected")

const router = require("express").Router()



router

    .get("/agency-admin-fetch", getAllAgencyAdmin)
    .get("/agency-fetch", agencyAdminProtected, fetchAgency)
    .get("/agency-Bookings", agencyAdminProtected, getAllAgencyBookings)
    .get("/all-professional-fetch", agencyAdminProtected, getAllAgencyProfessionals)
    .put("/agency-profile-update", agencyAdminProtected, updateAgencyProfile)
    .put("/active-agency-professionals/:id", agencyAdminProtected, activeAgencyProfessionals)


module.exports = router