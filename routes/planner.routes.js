const express = require("express");
const router = express.Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Task = require("../models/Task.model")

router.get('/planner', async (req, res, next) => {
  const userId = req.session.currentUser._id;
  try {
    const user = await User.findById(userId).populate("planner")
    res.render('planner', user);
  } catch (error) {
    
  }
}); 



router.post('/create', async (req, res, next) => {
   const userId = req.session.currentUser._id
  try {
    //Create the task
    const {title, description, type, status,adress} = req.body;
    const createdTask = await Task.create({title, description, type, status,adress});

    //Add task to the user
    await User.findByIdAndUpdate(userId, {$push : {planner: createdTask._id}})

    res.redirect(`/planner`);
  } catch (error) {
  console.log(error);
  next(error);
  }
});


//See details
router.get("/task/:id", isLoggedOut, async (req, res) => {
  const {id} = req.params
  const oneTask = await Task.findById(id)
  res.render("task", oneTask );
})

//See edit task form
router.get("/edit-task/:id", isLoggedOut, (req, res) => {
  res.render("edit-task");
});

//Receives edit task form 
router.post('/edit-task/:id', async (req, res, next) => {
  try {
    const { id } = req.params; 
    const { title, description, date, type, status, address } = req.body
          
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, date, type, status, address });

    res.redirect(`/task/${updatedTask._id}`);
      
  } catch (error){
      console.log(error)
      next(error);
    }
  })
/*
router.get("/planner", isLoggedOut, async (req, res, next) => {
  try {
    const act = await Task.find();
    res.render("/planner",{act});

  } catch (error) {
    console.log(error);
    next(error);
  }
})



router.get("/task/:id", isLoggedOut, async (req, res) => {
  const {id} = req.params
  const oneTask = await Task.findById(id)
  res.render("task", oneTask );
});*/


/*router.get("/edit-task/:id", isLoggedOut, (req, res) => {
        res.render("/views/edit-task");
      });
      
router.post('/edit-task/:id', async (req, res, next) => {
  try {
    const { id } = req.params; 
    const { title, description, date, type, status, address } = req.body
          
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, date, type, status, address });

    res.redirect(`/task/${updatedTask._id}`);
      
  } catch (error){
      console.log(error)
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
  });*/


module.exports = router;