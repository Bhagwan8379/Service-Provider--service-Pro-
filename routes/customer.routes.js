const { getAllCustomers, bookProfessional, getProfetionDetails,
    getCustomerProfile, updateCustomerProfile, fetchCustomerBookHistory } = require("../controllers/customer.controller")
const { customerProtected } = require("../middlewares/Protected")

const router = require("express").Router()



router

    .get("/customers-fetch", getAllCustomers)
    .get("/customers-detail-fetch", customerProtected, getCustomerProfile)
    .put("/customers-profile-update", customerProtected, updateCustomerProfile)

    // booking
    .post("/book-professiona", customerProtected, bookProfessional)
    .get("/fetch-pro-details/:id", customerProtected, getProfetionDetails)
    .get("/fetch-book-details", customerProtected, fetchCustomerBookHistory)

module.exports = router