var express = require('express')
var router = express.Router()
var Obra = require('../../controllers/obra')

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

router.post('/inserir',(req,res) =>{
    Obra.inserir(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na inserção da Obra: ' + erro))
})

module.exports = router;
