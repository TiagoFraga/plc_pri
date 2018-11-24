var express = require('express')
var router = express.Router()
var User = require('../../controllers/user')


router.get('/',(req,res) =>{
    User.list()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem dos Utilizadores: ' + erro))
})

router.get('/:id',(req,res) =>{
    console.dir(req.params.id)
    User.getUserID(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na lista do Utilizador: ' + erro))
})

router.post('/',(req,res) => {
    User.inserir(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na inserção do Utilizador: ' + erro))
})

module.exports = router;
