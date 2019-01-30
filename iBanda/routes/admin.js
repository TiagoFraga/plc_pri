var express = require('express')
var router = express.Router()
var axios = require('axios')
var passport = require('passport')




router.get('/',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    res.render('admin')
})

router.get('/users/registar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    res.render('registarUser')
})

router.get('/users/listar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/users/listar')
        .then(dados => {res.render('listaUsers',{users: dados.data})})
        .catch(erro => {
            console.log('Erro na listagem do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
    })
})

router.post('/users/registar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/users/registar', req.body)
        .then(()=> res.redirect('http://localhost:9009/admin'))
        .catch(erro => {
            console.log('Erro na inserção do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na inserção de Utilizador"})
    })
})

router.get('/noticias/registar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    res.render('registarNoticia')
})

router.post('/noticias/registar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/noticias/registar', req.body)
        .then(()=> res.redirect('http://localhost:9009/admin/noticias/listar'))
        .catch(erro => {
            console.log('Erro na inserção da Notícia: ' + erro)
            res.render('error', {error: erro, message: "Erro na inserção da Notícia"})
    })
})


router.get('/noticias/listar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/noticias/listar')
         .then(dados => {
            res.render('listarNoticias',{noticias: dados.data})})
         .catch(erro => {
                console.log('Erro na listagem de Notícias: ' + erro)
                res.render('error', {error: erro, message: "Erro na listagem de Notícias"})
         })
})

router.get('/eventos/registar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    res.render('registarEvento')
})



router.get('/eventos/listar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/eventos/listar')
         .then(dados => {
            console.log(dados.data) 
            res.render('listarEventos',{eventos: dados.data})})
         .catch(erro => {
                console.log('Erro na listagem de Eventos: ' + erro)
                res.render('error', {error: erro, message: "Erro na listagem de Eventos"})
         })
    
})



module.exports = router;
