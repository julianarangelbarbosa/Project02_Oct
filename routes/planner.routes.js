
const express = require("express");
const router = express.Router();


const User = require("../models/User.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


const Planner = require('../models/User.model');



  
    // Route para a página que mostra o calendário
    router.get("/planner1", isLoggedOut, (req, res) => {
      res.render("planner2");
    });
    
    router.post('/planner2', async (req, res, next) => {
      try {
        const {aaaaaaaaaaa} = req.body; //// Dúvida
        const createPlanner = await Planner.create({aaaaaa}); /// Dúvida
        
        res.redirect(`/planner2`);
    
    } catch (error){
          console.log(error);
          next(error);
        }
      })
  
      router.get("/planner2", isLoggedOut, (req, res) => {
        res.render("planner1");
      });
      
      router.post('/planner1', async (req, res, next) => {
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