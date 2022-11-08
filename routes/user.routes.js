
const express = require("express");
const router = express.Router();
const Task = require ("../models/Task.model")
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require('../models/User.model');

// Início do code Juliana e Camila
// GET /profile
router.get('/profile', async (req, res,next) => {
  const userId = req.session.currentUser._id;
  try {
    const user = await User.findById(userId)
    res.render('profile', user);
  } catch (error) {
    
  }
  


});


 
/*router.get("/task-list", async (req, res, next) => {
  try {
     const tasks = await Maintask.find();
     res.render("/task-list",{tasks});
     //console.log(books);
 } catch (error){
     console.log(error);
     next(error);
  }
 });*/
   
module.exports = router;