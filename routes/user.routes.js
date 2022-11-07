
const express = require("express");
const router = express.Router();

const User = require("../models/User.model");

const Maintask = require ("../models/Activity.model")

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


const Planner = require('../models/User.model');


// Início do code Juliana e Camila
// GET /profile
router.get("/profile", async (req, res,next) => {
    try {
    const tasks = await Maintask.find();
    res.render("/planner");
    }   catch (error){
        console.log(error);
        next(error);
      }       
  });
   
module.exports = router;