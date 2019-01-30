var express = require('express')
var router = express.Router()
var User = require('../../controllers/user')
var Obra = require('../../controllers/obra')
var Noticia = require('../../controllers/noticia')
var Evento = require('../../controllers/evento')


//**************************** Obras **********************************************

// Rota da api para listar todas as obras
router.get('/obras/listar',(req,res) =>{
    Obra.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem das Obras: ' + erro))
})

// Rota da api para listar uma determinada obra
router.get('/obras/listar/obra/:obra',(req,res) =>{
    Obra.consultar(req.params.obra)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem da Obra: ' + erro))
})

// Rota da api para listar as obras por tipo
router.get('/obras/listar/tipo/:tipo',(req,res) =>{
    Obra.listarTipo(req.params.tipo)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem das Obras: ' + erro))
})

// Rota da api para remover uma obra da base de dados
router.post('/obras/remover',(req,res) =>{
    Obra.remove(req.body.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na remoção da Obra: ' + erro))
})

// Rota da api para atualizar uma obra na base de dados
router.post('/obras/atualiza',(req,res)=>{
    Obra.atualiza(req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send('Erro na atualização da Obra: ' + erro))
})


//**************************** Utilizadores **********************************************

// Rota da api para listar todos  os utilizadores
router.get('/users/listar',(req,res) =>{
    User.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem dos Utilizadores: ' + erro))
})

// Rota da api para listar um utilizador
router.get('/users/listar/user/:user',(req,res) =>{
    User.consultar(req.params.user)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem do Utilizador: ' + erro))
})

// Rota da api para listar os utilizadores por tipo
router.get('/users/listar/tipo/:tipo',(req,res) =>{
    User.listarTipo(req.params.tipo)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem dos Utilizadores: ' + erro))
})

// Rota da api para registar um utilizador na base de dados
router.post('/users/registar',(req,res) => {
    User.inserir(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na inserção do Utilizador: ' + erro))
})

// Rota da api para remover um utilizador da base de dados
router.post('/users/remover',(req,res) =>{
    User.remove(req.body.username)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na remoção do Utilizador: ' + erro))
})

// Rota da api para atualizar um utilizador na base de dados
router.post('/users/atualiza',(req,res)=>{
    User.atualiza(req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send('Erro na atualização da Obra: ' + erro))
})

//**************************** Noticias **********************************************

// Rota da api para  Listar todas as notícias 
router.get('/noticias/listar',(req,res) =>{
    Noticia.listar()
           .then(dados =>{console.log(dados) 
                          res.jsonp(dados)} )
           .catch(erro => res.status(500).send('Erro na Listagem de Notícias: ' + erro))
})

// Rota da api para Adicionar nova notícia na base de dados
router.post('/noticias/registar',(req,res) =>{
    Noticia.adicionar(req.body)
           .then(dados => res.jsonp(dados))
           .catch(erro => res.status(500).send('Erro na inserção da Notícia: ' + erro))
})

// Rota da api para Atualizar uma dada notícia na base de dados
router.post('/noticias/atualiza',(req,res) =>{
    Noticia.atualiza(req.body)
           .then(dados => res.jsonp(dados))
           .catch(erro => res.status(500).send('Erro na atualização da Notícia: ' + erro))
})

// Rota da api para Remover uma dada notícia da base de dados
router.post('/noticias/remover',(req,res) =>{
    Noticia.remove(req.body.id)
           .then(dados => res.jsonp(dados))
           .catch(erro => res.status(500).send('Erro na remoção da Notícia: ' + erro))
})

// Rota da api para Alterar a visibilidade de uma  dada notícia na base de dados
router.post('/noticias/visibilidade',(req,res) =>{
    Noticia.alteraVisibilidade(req.body.id)
           .then(dados => res.jsonp(dados))
           .catch(erro => res.status(500).send('Erro na alteração de visibilidade da Notícia: ' + erro))
})


//**************************** Eventos **********************************************

// Lista todos os Eventos
router.get('/eventos/listar',(req,res) =>{
    Evento.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na listagem dos Eventos: ' + erro))
})

// Lista os Eventos por um dado tipo
router.get('/eventos/listar/tipo/:tipo',(req,res) =>{
    Evento.listarTipo(req.params.tipo)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na listagem dos Eventos: ' + erro))
})

// Lista os Eventos por ordem decrescente, maiores que uma dada data
router.get('/eventos/listar/data/:data',(req,res) =>{
    Evento.listarData(req.params.data)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na listagem dos Eventos: ' + erro))
})

// Lista todos os Eventos de uma data especifica
router.get('/eventos/listar/dataExacta/:data',(req,res) =>{
    Evento.listarDataExacta(req.params.data)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na listagem dos Eventos: ' + erro))
})

// Lista a informação de um Evento dado um id 
router.get('/eventos/listar/consultar/:id',(req,res) =>{
    Evento.consultar(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na listagem dos Eventos: ' + erro))
})

// Insere um novo evento
router.post('/eventos/registar',(req,res) => {
    Evento.inserir(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na inserção do Evento: ' + erro))
})

// Atualiza um evento, dado um evento completo
router.post('/eventos/atualizar',(req,res) => {
    Evento.atualizar(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na atualização do Evento: ' + erro))
})

// Apaga um evento, dado o id de um evento
router.post('/eventos/remover',(req,res) => {
    Evento.remover(req.body.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro: Erro na atualização do Evento: ' + erro))
})

module.exports = router;
