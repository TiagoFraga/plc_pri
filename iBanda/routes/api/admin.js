var express = require('express')
var router = express.Router()
var User = require('../../controllers/user')
var Obra = require('../../controllers/obra')
var Noticia = require('../../controllers/noticia')
var Evento = require('../../controllers/evento')
var passport = require('passport')


//**************************** Obras **********************************************

// Rota da api para listar todas as obras
router.get('/obras/listar',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    Obra.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem das Obras: ' + erro))
})

// Rota da api para listar uma determinada obra
router.get('/obras/listar/obra/:obra',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    Obra.consultar(req.params.obra)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem da Obra: ' + erro))
})

// Rota da api para listar as obras por tipo
router.get('/obras/listar/tipo/:tipo',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    Obra.listarTipo(req.params.tipo)
        .then(dados => { res.jsonp(dados)})
        .catch(erro => res.status(500).send('Erro na listagem das Obras: ' + erro))
})

// Rota da api para remover uma obra da base de dados
router.post('/obras/remover',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    Obra.remove(req.body.id)
        .then(dados =>{res.jsonp(dados)})
        .catch(erro => res.status(500).send('Erro na remoção da Obra: ' + erro))
})

// Rota da api para atualizar uma obra na base de dados
router.post('/obras/atualiza',passport.authenticate('isAdmin',{session:false}),(req,res)=>{
    Obra.atualiza(req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send('Erro na atualização da Obra: ' + erro))
})


//**************************** Utilizadores **********************************************

// Rota da api para listar todos  os utilizadores
router.get('/users/listar',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    User.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem dos Utilizadores: ' + erro))
})

// Rota da api para listar um utilizador
router.get('/users/listar/user/:user',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    User.consultar(req.params.user)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem do Utilizador: ' + erro))
})

// Rota da api para listar os utilizadores por tipo
router.get('/users/listar/tipo/:tipo',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    User.listarTipo(req.params.tipo)
        .then(dados => { res.jsonp(dados)})
        .catch(erro => res.status(500).send('Erro na listagem dos Utilizadores: ' + erro))
})

// Rota da api para registar um utilizador na base de dados
router.post('/users/registar',passport.authenticate('isAdmin',{session:false}),(req,res) => {
    User.inserir(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na inserção do Utilizador: ' + erro))
})

// Rota da api para remover um utilizador da base de dados
router.post('/users/remover',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    User.remove(req.body.username)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na remoção do Utilizador: ' + erro))
})

router.get('/users/atualizar/:username',passport.authenticate('isAdmin',{session:false}),(req,res)=>{
    User.consultar(req.params.username)
           .then(dados => res.jsonp(dados))
           .catch(erro => res.status(500).send('Erro na obtenção da Notícia: ' + erro))
})

// Rota da api para atualizar um utilizador na base de dados
router.post('/users/atualizar',passport.authenticate('isAdmin',{session:false}),(req,res)=>{
    User.atualiza(req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send('Erro na atualização da Obra: ' + erro))
})

//**************************** Noticias **********************************************

// Rota da api para  Listar todas as notícias 
router.get('/noticias/listar',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    Noticia.listar()
           .then(dados =>{ 
                          res.jsonp(dados)} )
           .catch(erro => res.status(500).send('Erro na Listagem de Notícias: ' + erro))
})

// Rota da api para Adicionar nova notícia na base de dados
router.post('/noticias/registar',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    Noticia.adicionar(req.body)
           .then(dados => res.jsonp(dados))
           .catch(erro => res.status(500).send('Erro na inserção da Notícia: ' + erro))
})

router.get('/noticias/atualizar/:id',passport.authenticate('isAdmin',{session:false}),(req,res)=>{
    Noticia.obter(req.params.id)
           .then(dados => res.jsonp(dados))
           .catch(erro => res.status(500).send('Erro na obtenção da Notícia: ' + erro))
})

// Rota da api para Atualizar uma dada notícia na base de dados
router.post('/noticias/atualizar',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    Noticia.atualiza(req.body)
           .then(dados => res.jsonp(dados))
           .catch(erro => res.status(500).send('Erro na atualização da Notícia: ' + erro))
})

// Rota da api para Remover uma dada notícia da base de dados
router.post('/noticias/remover',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    Noticia.remove(req.body.id)
           .then(dados => res.jsonp(dados))
           .catch(erro => res.status(500).send('Erro na remoção da Notícia: ' + erro))
})

// Rota da api para Alterar a visibilidade de uma  dada notícia na base de dados
router.post('/noticias/visibilidade',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    Noticia.alteraVisibilidade(req.body.id)
           .then(dados => res.jsonp(dados))
           .catch(erro => res.status(500).send('Erro na alteração de visibilidade da Notícia: ' + erro))
})


//**************************** Eventos **********************************************

// Lista todos os Eventos
router.get('/eventos/listar',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    Evento.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na listagem dos Eventos: ' + erro))
})

// Lista os Eventos por um dado tipo
router.get('/eventos/listar/tipo/:tipo',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    Evento.listarTipo(req.params.tipo)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na listagem dos Eventos: ' + erro))
})

// Lista os Eventos por ordem decrescente, maiores que uma dada data
router.get('/eventos/listar/data/:data',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    Evento.listarData(req.params.data)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na listagem dos Eventos: ' + erro))
})

// Lista todos os Eventos de uma data especifica
router.get('/eventos/listar/dataExacta/:data',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    Evento.listarDataExacta(req.params.data)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na listagem dos Eventos: ' + erro))
})

// Lista a informação de um Evento dado um id 
router.get('/eventos/listar/consultar/:id',passport.authenticate('isAdmin',{session:false}),(req,res) =>{
    Evento.consultar(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na listagem dos Eventos: ' + erro))
})

// Insere um novo evento
router.post('/eventos/registar',passport.authenticate('isAdmin',{session:false}),(req,res) => {
    Evento.inserir(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na inserção do Evento: ' + erro))
})

router.post('/eventos/inserir',passport.authenticate('isAdmin',{session:false}),async (req,res) => {
    for(var i in req.body){
        console.log("API : " + JSON.stringify(req.body[i]))
        await Evento.inserirPorFicheiro(req.body[i])
                    .then(dados => res.jsonp(dados))
                    .catch(erro => res.status(500).send('Erro: Erro na inserção do Evento: ' + erro))
    }
})

router.get('/eventos/atualizar/:id',passport.authenticate('isAdmin',{session:false}),(req,res)=>{
    Evento.consultar(req.params.id)
           .then(dados => res.jsonp(dados))
           .catch(erro => res.status(500).send('Erro na obtenção da Notícia: ' + erro))
})

// Atualiza um evento, dado um evento completo
router.post('/eventos/atualizar',passport.authenticate('isAdmin',{session:false}),(req,res) => {
    Evento.atualizar(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na atualização do Evento: ' + erro))
})

// Apaga um evento, dado o id de um evento
router.post('/eventos/remover',passport.authenticate('isAdmin',{session:false}),(req,res) => {
    Evento.remover(req.body.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na atualização do Evento: ' + erro))
})

module.exports = router;
