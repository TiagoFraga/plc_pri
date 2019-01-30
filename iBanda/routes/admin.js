var express = require('express')
var router = express.Router()
var axios = require('axios')
var passport = require('passport')




router.get('/',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    res.render('admin')
})

// ******************************* Utilizadores ***************************************

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
        .then(()=> res.redirect('http://localhost:9009/admin/users/listar'))
        .catch(erro => {
            console.log('Erro na inserção do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na inserção de Utilizador"})
    })
})

router.post('/users/remover',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/users/remover', req.body)
        .then(()=> res.redirect('http://localhost:9009/admin/users/listar'))
        .catch(erro => {
            res.render('error', {error: erro, message: "Erro na remoção de Utilizador"})
    })
})

// ******************************* Obras ***************************************

router.get('/obras/listar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/obras/listar')
        .then(dados => {res.render('listarObras',{obras: dados.data})})
        .catch(erro => {
            console.log('Erro na listagem do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
    })
})

router.get('/obras/listar/obra/:obra',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/obras/listar/obra/' + req.params.obra)
        .then(dados => {res.render('listarObra',{obra: dados.data})})
        .catch(erro => {
            console.log('Erro na listagem do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
    })
})

router.post('/obras/remover',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/obras/remover', req.body)
        .then(()=> res.redirect('http://localhost:9009/admin/obras/listar'))
        .catch(erro => {
            console.log('Erro na inserção da Notícia: ' + erro)
            res.render('error', {error: erro, message: "Erro na inserção da Notícia"})
    })
})


// ******************************* Noticias ***************************************


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

router.post('/noticias/remover',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/noticias/remover', req.body)
        .then(()=> res.redirect('http://localhost:9009/admin/noticias/listar'))
        .catch(erro => {
            console.log('Erro na inserção da Notícia: ' + erro)
            res.render('error', {error: erro, message: "Erro na inserção da Notícia"})
    })
})

router.post('/noticias/visibilidade',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/noticias/visibilidade', req.body)
        .then(()=> res.redirect('http://localhost:9009/admin/noticias/listar'))
        .catch(erro => {
            console.log('Erro na inserção da Notícia: ' + erro)
            res.render('error', {error: erro, message: "Erro na inserção da Notícia"})
    })
})


// ******************************* Eventos ***************************************


router.get('/eventos/registar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    res.render('registarEvento')
})


router.get('/eventos/listar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/eventos/listar')
         .then(dados => {
            res.render('listarEventos',{eventos: dados.data})})
         .catch(erro => {
                console.log('Erro na listagem de Eventos: ' + erro)
                res.render('error', {error: erro, message: "Erro na listagem de Eventos"})
         })
    
})

router.post('/eventos/registar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    console.log(req.body)
    axios.post('http://localhost:9009/api/admin/eventos/registar', req.body)
        .then(()=> res.redirect('http://localhost:9009/admin/eventos/listar'))
        .catch(erro => {
            console.log('Erro na inserção do Evento: ' + erro)
            res.render('error', {error: erro, message: "Erro na inserção do Evento"})
    })
})

router.post('/eventos/remover',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/eventos/remover', req.body)
        .then(()=> res.redirect('http://localhost:9009/admin/eventos/listar'))
        .catch(erro => {
            console.log('Erro na inserção da Notícia: ' + erro)
            res.render('error', {error: erro, message: "Erro na inserção da Notícia"})
    })
})


module.exports = router;
