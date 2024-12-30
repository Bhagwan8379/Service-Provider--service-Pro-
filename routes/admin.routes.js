const { getAllAdmin, getAllAdminProfessionals, activeAgency,
    activeAdminProfessionals, activeCutomers,
    updateAdminProfile,
    getAllProfessionalsBookings } = require("../controllers/admin.controller")
const { adminProtected } = require("../middlewares/Protected")

const router = require("express").Router()



router
    .get("/admin-professional-fetch", adminProtected, getAllAdminProfessionals)
    .get("/get-admin", adminProtected, getAllAdmin)
    .get("/get-bookings", adminProtected, getAllProfessionalsBookings)
    .put("/admin-profile-update", adminProtected, updateAdminProfile)
    .put("/active-agency/:id", adminProtected, activeAgency)
    .put("/active-professionals/:id", adminProtected, activeAdminProfessionals)
    .put("/active-customer/:id", adminProtected, activeCutomers)



module.exports = router