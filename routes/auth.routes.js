const { registerAdmin, loginAdmin, logoutAdmin,
    professionalLogout, adminProfessionalRegister,
    registerAgencyAdmin, logoutAgencyAdmin,
    customerRegister, customerLogout,
    agencyProfessionalRegister,


} = require("../controllers/auth.controller")

const { adminProtected, agencyAdminProtected } = require("../middlewares/Protected")
const router = require("express").Router()



router
    // Admin route
    .post("/register-admin", registerAdmin)
    .post("/login-admin", loginAdmin)
    .post("/logout-admin", logoutAdmin)

    // Admin Professional route
    .post("/professional-register", adminProtected, adminProfessionalRegister)
    .post("/professional-logout", professionalLogout)

    // agency professional route
    .post("/register-agency-professional", agencyAdminProtected, agencyProfessionalRegister)
    .post("/logout-agency-professional", professionalLogout)


    // Agency Admin route
    .post("/agency-admin-register", registerAgencyAdmin)
    .post("/agency-admin-logout", logoutAgencyAdmin)


    // Customer Register route
    .post("/customer-register", customerRegister)
    .post("/customer-logout", customerLogout)


module.exports = router