var User = require('../models/user')
var bcrypt = require('bcrypt')
const Users = module.exports

// Devolve a lista de Users em JSON
Users.listar = () => {
    return User
        .find()
        .exec()
}

Users.consultar = uname => {
    return User
        .findOne({_id: uname})
        .exec()
}

Users.listarTipo = tipo => {
    return User
        .findOne({userType: tipo})
        .exec()
}

Users.inserir = async u => {
    var hash = await bcrypt.hash(u.password, 10)
    u.password = hash
    var user = new User({
        _id: u.username,
        password: u.password,
        name: u.nome,
        email: u.email,
        userType: u.userType
    })
    return User.create(user)
}


Users.remove = username =>{
    User.findByIdAndRemove(username,(erro,doc) =>{
        if(!erro){
            console.log('Utilizador removido com sucesso')
        }
        else{
            console.log('Não consegui remover utilizador')
        }
        return doc
    })
} 

