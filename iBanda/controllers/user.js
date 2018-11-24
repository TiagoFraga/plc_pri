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
        .findOne({_id: userId})
        .exec()
}

Users.inserir = u => {
    var user = new User({
        _id: u._id,
        password: u.password,
        name: u.nome,
        email: u.email,
        userType: u.userType
    })
    return User.create(user)
}
