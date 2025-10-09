const express = require("express")
const { getResponse } = require("../controllers/AI.controllers")


const router = express.Router()

router.post("/check",getResponse)


module.exports= router