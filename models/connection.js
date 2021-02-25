var mongo = require('mongoose')

var options = {
    connectTimeoutMS : 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true
}

mongo.connect('mongodb+srv://',
options,
function(err) {
console.log(err)
}
)