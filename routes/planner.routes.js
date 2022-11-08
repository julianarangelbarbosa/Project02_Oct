
const express = require("express");
const router = express.Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Task = require("../models/Activity.model")


  
 
router.get("/planner", isLoggedOut, async (req, res, next) => {
  try {
    const act = await Task.find({user: id});

    res.render("/views/planner");
  } catch (error) {
    console.log(error);
    next(error);
  }
})

router.get("/task/:id", isLoggedOut, async (req, res) => {
  const {id} = req.params
  const oneTask = await Task.findById(id)
  res.render("task", oneTask );
});


router.get("/edit-task/:id", isLoggedOut, (req, res) => {
        res.render("/views/edit-task");
      });
      
router.post('/edit-task/:id', async (req, res, next) => {
  try {
    const { id } = req.params; 
    const { title, description, date, type, status, address } = req.body
          
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, date, type, status, address });

    res.redirect(`/task/${updatedTask._id}`);
      
  } catch (error){
      console.log(error);
      next(error);
    }
  })
router.post('/task-delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndRemove(id);
    res.redirect('/planner');
  } catch (error) {
    console.log(error);
    next(error);
    }
  });


module.exports = router;