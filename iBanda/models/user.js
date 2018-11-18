var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema (
    {
        _id: {type: String, required: true},
        password: {type: String, required: true},
        name: {type: String, required: true},
        email: {type: String, required: true},
        userType: {type: String, required: true}
    }
)

module.exports = mongoose.model('User',UserSchema,'users')