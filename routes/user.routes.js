
const express = require("express");
const router = express.Router();


const User = require("../models/User.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


const Planner = require('../models/User.model');


// Início do code Juliana e Camila
// GET /profile
router.get("/profile", isLoggedOut, (req, res,next) => {
    try {
      const activities = await
      res.render("planner1");
    }   catch (error){
        console.log(error);
        next(error);
      }
  
  });
  
  router.post('/profile', async (req, res, next) => {
    try {
      const {aaaaaaaaaaa} = req.body; //// Dúvida
      const createPlanner = await Planner.create({aaaaaa}); /// Dúvida
      
      res.redirect(`/planner1`);
  
  } catch (error){
        console.log(error);
        next(error);
      }
    })
  
   
        module.exports = router;