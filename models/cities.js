var mongo = require('mongoose')
var citySchema = mongo.Schema({
    idAPI : Number,
    name : String,
      desc: String,
      img : String ,
      temp_min : Number,
      temp_max: Number,
      lon: Number,
      lat: Number
})

var cityModel = mongo.model('cities', citySchema)




module.exports = cityModel;