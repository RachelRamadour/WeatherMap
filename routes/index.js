var express = require('express');
var router = express.Router();
var request = require("sync-request");
const { search } = require('../app');
var cityModel = require('../models/cities');


router.get('/weather', async function(req,res,next) {
  var cityList = await cityModel.find();
  if(req.session.user == null) {
    res.redirect('/')
  } else {
 res.render('weather', {cityList })
}})

router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});



router.post('/add-city', async function(req,res,next) {

  var meteoVille = request("GET", `http://api.openweathermap.org/data/2.5/weather?q=${req.body.nameCity}&units=metric&lang=fr&appid=5ce190b9b5681b1c5419924f3567a009`)
  meteoVille=JSON.parse(meteoVille.getBody())
  console.log(meteoVille)
    


if (meteoVille.name) {
  var alreadyExist = await cityModel.findOne({idAPI : meteoVille.id})
  if (alreadyExist == null) {
    var nameCity = new cityModel({
      idAPI : meteoVille.id,
      name : req.body.nameCity,
      desc: meteoVille.weather[0].description,
      img : "http://openweathermap.org/img/w/" + meteoVille.weather[0].icon + ".png",
      temp_min: Math.round(meteoVille.main.temp_min),
      temp_max: Math.round(meteoVille.main.temp_max),
      lon:meteoVille.coord.lon,
      lat: meteoVille.coord.lat
      });
      await nameCity.save();
      
  }
}
cityList = await cityModel.find()
console.log(cityList)
 res.render('weather', {cityList});
})


router.get('/delete-city', async function(req, res, next){

  await cityModel.deleteOne({
    _id:req.query._id});

  var cityList = await cityModel.find();

  res.render('weather', {cityList}) })


  router.get('/update-cities', async function(req,res,next){
    var cityList = await cityModel.find()

  for(var i = 0; i< cityList.length; i++){
    var meteoVille = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name}&units=metric&lang=fr&appid=0c815b9455235455a301668a56c67b18`) 
    meteoVille = await JSON.parse(meteoVille.body)
console.log(meteoVille.main.temp_min, Math.round(meteoVille.main.temp_min))
    await cityModel.updateOne({
      _id: cityList[i].id
    }, {
      name: cityList[i].name,
      desc:  meteoVille.weather[0].description.toUpperCase(),
      img: "http://openweathermap.org/img/wn/"+meteoVille.weather[0].icon+".png",
      temp_min: Math.round(meteoVille.main.temp_min),
      temp_max: Math.round(meteoVille.main.temp_max),
      lon:meteoVille.coord.lon,
      lat: meteoVille.coord.lat
    })
  }



  var cityList = await cityModel.find();
  res.render('weather',{cityList});
});

  
  
module.exports = router;