var express = require('express')
var router = express.Router()
var Obra = require('../../controllers/obra')
var Evento = require('../../controllers/evento')
var passport = require('passport')


//**************************** Obras **********************************************

// Rota da api para listar todas as obras
router.get('/obras/listar',passport.authenticate('isProdutor',{session:false}),(req,res) =>{
    Obra.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem das Obras: ' + erro))
})

// Rota da api para listar uma determinada obra
router.get('/obras/listar/obra/:obra',passport.authenticate('isProdutor',{session:false}),(req,res) =>{
    Obra.consultar(req.params.obra)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem da Obra: ' + erro))
})

// Rota da api para listar as obras por tipo
router.get('/obras/listar/tipo/:tipo',passport.authenticate('isProdutor',{session:false}),(req,res) =>{
    Obra.listarTipo(req.params.tipo)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem das Obras: ' + erro))
})

// Rota da api para inserir uma obra da base de dados
router.post('/obras/inserir',passport.authenticate('isProdutor',{session:false}),(req,res) =>{
    Obra.insere(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na inserção da Obra: ' + erro))
})



// Rota da api para remover uma obra da base de dados
router.post('/obras/remover',passport.authenticate('isProdutor',{session:false}),(req,res) =>{
    Obra.remove(req.body.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na remoção da Obra: ' + erro))
})

// Rota da api para atualizar uma obra na base de dados
router.post('/obras/atualiza',passport.authenticate('isProdutor',{session:false}),(req,res)=>{
    Obra.atualiza(req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send('Erro na atualização da Obra: ' + erro))
})




//**************************** Eventos **********************************************

// Lista todos os Eventos
router.get('/eventos/listar',passport.authenticate('isProdutor',{session:false}),(req,res) =>{
    Evento.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na listagem dos Eventos: ' + erro))
})

// Lista os Eventos por um dado tipo
router.get('/eventos/listar/tipo/:tipo',passport.authenticate('isProdutor',{session:false}),(req,res) =>{
    Evento.listarTipo(req.params.tipo)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na listagem dos Eventos: ' + erro))
})

// Lista os Eventos por ordem decrescente, maiores que uma dada data
router.get('/eventos/listar/data/:data',passport.authenticate('isProdutor',{session:false}),(req,res) =>{
    Evento.listarData(req.params.data)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na listagem dos Eventos: ' + erro))
})

// Lista todos os Eventos de uma data especifica
router.get('/eventos/listar/dataExacta/:data',passport.authenticate('isProdutor',{session:false}),(req,res) =>{
    Evento.listarDataExacta(req.params.data)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na listagem dos Eventos: ' + erro))
})

// Lista a informação de um Evento dado um id 
router.get('/eventos/listar/consultar/:id',passport.authenticate('isProdutor',{session:false}),(req,res) =>{
    Evento.consultar(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na listagem dos Eventos: ' + erro))
})

module.exports = router;
