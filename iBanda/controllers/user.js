var User = require('../models/user')

const Users = module.exports

// Devolve a lista de pubs em JSON
Users.list = () => {
    return User
        .find()
        .exec()
}

Users.getUserID = a => {
    var userId = new RegExp(a, "i")
    return User
        .find({_id: userId})
        .exec()
}
