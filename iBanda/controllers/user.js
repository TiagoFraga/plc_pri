var User = require('../models/user')
var bcrypt = require('bcrypt-nodejs')
const Users = module.exports

// Função para listar todos os utilizadores
Users.listar = () => {
    return User
        .find()
        .exec()
}

// Função para listar um dado utilizador
Users.consultar = uname => {
    return User
        .findOne({_id: uname})
        .exec()
}

// Função para listar os utilizadores por tipo
Users.listarTipo = tipo => {
    return User
        .findOne({userType: tipo})
        .exec()
}

// Função para inserir um utilizador
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

// Função para remover um dado utilizador 
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

