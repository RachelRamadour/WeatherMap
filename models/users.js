var mongo = require('mongoose')
var userSchema = mongo.Schema({
    userName : String,
    email : String,
    password : String,
 
})

var userModel = mongo.model('users', userSchema)

module.exports = userModel;