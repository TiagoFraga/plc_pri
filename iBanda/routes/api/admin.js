var express = require('express')
var router = express.Router()
var User = require('../../controllers/user')
var Obra = require('../../controllers/obra')


// Rotas Obras 
router.get('/obras/listar',(req,res) =>{
    Obra.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem das Obras: ' + erro))
})

router.get('/obras/listar/obra/:obra',(req,res) =>{
    Obra.consultar(req.params.obra)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem da Obra: ' + erro))
})

router.get('/obras/listar/tipo/:tipo',(req,res) =>{
    Obra.listarTipo(req.params.tipo)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem das Obras: ' + erro))
})

/*
router.get('/obras/remove/:obra',(req,res) =>{
    Obra.remove(req.params.obra)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na remoção da Obra: ' + erro))
})
*/

/*
router.post('/obras/atualiza',(req,res)=>{
    Obra.atualiza(req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send('Erro na atualização da Obra: ' + erro))
})
*/

// Rotas Users

router.get('/users/listar',(req,res) =>{
    User.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem dos Utilizadores: ' + erro))
})

router.get('/users/listar/user/:user',(req,res) =>{
    User.consultar(req.params.user)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem do Utilizador: ' + erro))
})

router.get('/users/listar/tipo/:tipo',(req,res) =>{
    User.listarTipo(req.params.tipo)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem dos Utilizadores: ' + erro))
})

router.post('/registo',(req,res) => {
    User.inserir(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na inserção do Utilizador: ' + erro))
})

/*
router.get('/users/remove/:user',(req,res) =>{
    User.remove(req.params.user)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na remoção do Utilizador: ' + erro))
})
*/

/*
router.post('/users/atualiza',(req,res)=>{
    User.atualiza(req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send('Erro na atualização da Obra: ' + erro))
})
*/

module.exports = router;
