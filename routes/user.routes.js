
const express = require("express");
const router = express.Router();

const User = require("../models/User.model");

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

    const {username} = req.body;

    const createTask = await Tasks.create({username});

    res.redirect(`/create-task/${createTask.id}`);
  } catch (error) {
  console.log(error);
  next(error);
  }
});
  
  //if (!req.session) res.redirect('/');


  //req.session.destroy((err) => {
    //if (err) next(err);
    //else res.redirect('/');

  
  
   
module.exports = router;