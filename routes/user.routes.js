
const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Maintask = require ("../models/Activity.model")
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Planner = require('../models/User.model');

// Início do code Juliana e Camila
// GET /profile
router.get('/profile', (req, res,next) => {
  const user = req.session.user;
  console.log(user);

  res.render('profile', user);
});

router.post('/profile', async (req, res, next) => {
  try {

    const {username, title, description, type, status,adress} = req.body;
    const createTask = await Maintask.create({username, title, description, type, status,adress});

    res.redirect(`/task-list`);
  } catch (error) {
  console.log(error);
  next(error);
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