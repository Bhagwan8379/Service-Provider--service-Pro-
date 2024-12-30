const { fetchAllAcTechnicians, fetchAllCarpenter, fetchAllCleaners,
    fetchAllFarmers, fetchAllGardener, fetchAllPaitnters, fetchAllPlumbers,
    fetchAllelectricians } = require("../controllers/services.controller")

const router = require("express").Router()



router


    //  FETCH SERVICES ROUTES
    .get("/get-Actechnicians", fetchAllAcTechnicians)
    .get("/get-carpenter", fetchAllCarpenter)
    .get("/get-cleaners", fetchAllCleaners)
    .get("/get-farmers", fetchAllFarmers)
    .get("/get-gardener", fetchAllGardener)
    .get("/get-painters", fetchAllPaitnters)
    .get("/get-plumbers", fetchAllPlumbers)
    .get("/get-electricians", fetchAllelectricians)

module.exports = router