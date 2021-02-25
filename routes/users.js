var express = require('express');
var router = express.Router();
// Import module sync request
var request = require("sync-request");
const { search } = require('../app');
var userModel = require('../models/users');



router.post('/sign-up', async function(req,res,next){

  var searchUser = await userModel.find({email:req.body.email});

  if (searchUser.length >0) {
    console.log('vous avez déjà un compte. Veuillez vous connecter !')
    res.redirect('/')
  } 
  
  else {
console.log('req session email', req.session.email)
req.session.userName = req.body.userName;
req.session.email = req.body.email;
req.session.password = req.body.password;
var newUser = new userModel({
userName : req.session.userName,
email : req.session.email,
password : req.session.password,
})

var newUser = await newUser.save()

req.session.user = {name: newUser.userName, id: newUser._id};

res.redirect('/weather')
}
})

router.post('/sign-in', async function(req,res,next){
  var searchUser = await userModel.findOne(
    {email:req.body.email,
    password:req.body.password
    }
    )

    if (searchUser!=null){
      req.session.user = {userName: searchUser.userName, id:searchUser._id};
      res.redirect('/weather'); 
     }
      else {
res.render('login')
  }
});


router.get('/logout', function(req,res,next) {
req.session.user = null;
res.redirect('/')
});

module.exports = router;