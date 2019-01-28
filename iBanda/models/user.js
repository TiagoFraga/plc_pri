var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var Schema = mongoose.Schema


var UserSchema = new Schema (
    {
        _id: {type: String,required: true},
        password: {type: String, required: true},
        name: {type: String, required: true},
        email: {type: String, required: true,unique: true},
        userType: {type: String, required: true}
    }
)

UserSchema.methods.isValidPassword = async function(password){
    var user = this
    var compare = await bcrypt.compare(password,user.password)
    return compare
}




module.exports = mongoose.model('User',UserSchema,'users')