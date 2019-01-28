var express = require('express')
var router = express.Router()
var User = require('../../controllers/user')
var Obra = require('../../controllers/obra')
var Noticia = require('../../controllers/noticia')

// Rotas Obras 

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
router.get('/obras/remove/:obra',(req,res) =>{
    Obra.remove(req.params.obra)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na remoção da Obra: ' + erro))
})


// Rota da api para atualizar uma obra na base de dados
router.post('/obras/atualiza',(req,res)=>{
    Obra.atualiza(req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send('Erro na atualização da Obra: ' + erro))
})


// Rotas Users

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
router.post('/registo',(req,res) => {
    User.inserir(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na inserção do Utilizador: ' + erro))
})


// Rota da api para remover um utilizador da base de dados
router.get('/users/remove/:user',(req,res) =>{
    User.remove(req.params.user)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na remoção do Utilizador: ' + erro))
})

// Rota da api para Atualizar um utilizador na base de dados
router.post('/users/atualiza',(req,res)=>{
    User.atualiza(req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send('Erro na atualização da Obra: ' + erro))
})

// Rotas gestão de Noticias 

// Rota da api para  Listar todas as notícias 
router.get('/noticia/listar',(req,res) =>{
    Noticia.listar()
           .then(dados => res.jsonp(dados))
           .catch(erro => res.status(500).send('Erro na Listagem de Notícias: ' + erro))
})

// Rota da api para Adicionar nova notícia na base de dados
router.post('/noticia/adiciona',(req,res) =>{
    Noticia.adiciona(req.body)
           .then(dados => res.jsonp(dados))
           .catch(erro => res.status(500).send('Erro na inserção da Notícia: ' + erro))
})

// Rota da api para Atualizar uma dada notícia na base de dados
router.post('/noticia/atualiza',(req,res) =>{
    Noticia.atualiza(req.body)
           .then(dados => res.jsonp(dados))
           .catch(erro => res.status(500).send('Erro na atualização da Notícia: ' + erro))
})

// Rota da api para Remover uma dada notícia da base de dados
router.get('/noticia/remove/:id',(req,res) =>{
    Noticia.remove(req.params.id)
           .then(dados => res.jsonp(dados))
           .catch(erro => res.status(500).send('Erro na remoção da Notícia: ' + erro))
})

// Rota da api para Alterar a visibilidade de uma  dada notícia na base de dados
router.get('/noticia/visibilidade/:id',(req,res) =>{
    Noticia.alteraVisibilidade(req.params.id)
           .then(dados => res.jsonp(dados))
           .catch(erro => res.status(500).send('Erro na alteração de visibilidade da Notícia: ' + erro))
})

module.exports = router;
