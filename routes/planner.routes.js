const express = require("express");
const router = express.Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Task = require("../models/Activity.model")

 
router.get("/task-list", isLoggedOut, async (req, res, next) => {
  try {
    const act = await Task.find();
    res.render("/task-list",{act});

  } catch (error) {
    console.log(error);
    next(error);
  }
})

module.exports = router;