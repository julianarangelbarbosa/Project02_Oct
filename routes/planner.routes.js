
const express = require("express");
const router = express.Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");


  
 
router.get("/planner", isLoggedOut, async (req, res) => {
  try {
    const act = await Act.find({user: id});

    res.render("/views/planner");
  } catch (error) {
    console.log(error);
    next(error);
  }
})

    
router.get("/edit-task/:id", isLoggedOut, (req, res) => {
        res.render("/views/edit-task");
      });
      
router.post('/edit-task/:id', async (req, res, next) => {
        try {
          const {aaaaaaaaaaa} = req.body; 
          const createPlanner = await Planner.create({aaaaaa}); /// Dúvida
          
          res.redirect(`/planner1`);
      
      } catch (error){
            console.log(error);
            next(error);
          }
        })

module.exports = router;