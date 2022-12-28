const express = require("express");
const router = express.Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Task = require("../models/Task.model")
const fileUploader = require('../config/cloudinary.config');


router.get('/planner', async (req, res, next) => {
  const userId = req.session.currentUser._id;
  try {
    const user = await User.findById(userId).populate("planner")
    let correctTasks = user.planner
    .sort((a, b) => a.date - b.date)
    .filter((task) => (!task.status || task.status != "Done"))
    .map((task) => { task.date.toDateString()})
    
    console.log(correctTasks)
    res.render('planner', user);
  } catch (error) {
    
  }
}); 
router.post('/create', async (req, res, next) => {
   const userId = req.session.currentUser._id
  try {
    //Create the task
    const {title, description, date, type, status, address, hhmm} = req.body;
    const createdTask = await Task.create({title, description,date, type, status, address, hhmm});

    //Add task to the user
    await User.findByIdAndUpdate(userId, {$push : {planner: createdTask._id}})
   
   
    res.redirect(`/planner`);
  } catch (error) {
  console.log(error);
  next(error);
  }
});


//See details
router.get("/task/:id", async (req, res) => {
  const {id} = req.params
  const oneTask = await Task.findById(id)
  res.render("task", oneTask );
})


//See edit task form
router.get("/edit-task/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
  
    const formatDate = task.date
    formatDate.value = task.date.toISOString().substr(0, 10);



    res.render("edit-task", {task, formatDate});
  } catch (error) { 
    console.log(error)
  }});

//Receives edit task form 
router.post('/edit-task/:id', async (req, res, next) => {
  try {
    const { id } = req.params; 
    const { title, description, date, type, status, address, hhmm } = req.body
    console.log(req.body)


          
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, date, type, status, address, hhmm });
    res.redirect(`/planner`);
      
  } catch (error){
      console.log(error)
      next(error);
    }
  })

//delete task
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









//See edit profile form
router.get("/edit-profile/:username", async (req, res) => {

  try {
    const {username} = req.params
    const userUpdate = await User.findOne({username: username})
    console.log(userUpdate)
    res.render("edit-profile", {userUpdate, username});
  } catch (error) { 
    console.log(error)
  }});

//Receives edit profile form 
router.post('/edit-profile/:username', fileUploader.single("image"), async (req, res, next) => {
  try {
    const { username } = req.params; 
    const { email, address, currentImg } = req.body

let profilePictureURL;

if(req.file){
  profilePictureURL = req.file.path
} else {
  profilePictureURL = currentImg
}

          
    const userUpdateAgain = await User.findOneAndUpdate({username: username}, { username, email, address, profilePictureURL });
    res.redirect('/profile');
      
  } catch (error){
      console.log(error)
      next(error);
    }
  })


 /*  const { id } = req.params; 
  const { title, description, date, type, status, address } = req.body
        
  const updatedTask = await Task.findByIdAndUpdate(id, { title, description, date, type, status, address });
  res.redirect(`/planner`); */
    

  /* router.post("/profile/:username/edit-profile", fileUploader.single('profilepicture'), (req, res, next) => {
    const {username} = req.params;
    const {location, email, website, linkedin, instagram, bio, password, name, surname, campus, course } = req.body;
    if(username !== req.session.user.username) {
      return;
    } else {
      if(req.file) {
        User.findOneAndUpdate({username: username}, {location, email, website, linkedin, instagram, bio, password, name, surname, campus, course, username, profilepicture: req.file.path})
        .then(() => res.redirect(`/profile/${username}`))
        .catch(err => next(err))
      } else {
        User.findOneAndUpdate({username: username}, {location, email, website, linkedin, instagram, bio, password, name, surname, campus, course, username})
        .then(() => res.redirect(`/profile/${username}`))
        .catch(err => next(err))
      }
    }
  }); */


module.exports = router;