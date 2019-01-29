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
        .then(dados => {
                        console.log(dados.data)
                        res.render('listaUsers',{users: dados.data})
                       })
        .catch(erro => {
            console.log('Erro na inserção do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "na inserção de Utilizador"})
    })
})


router.post('/users/registar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    console.dir(req.body)
    axios.post('http://localhost:9009/api/admin/users/registar', req.body)
        .then(()=> res.redirect('http://localhost:9009/admin'))
        .catch(erro => {
            console.log('Erro na inserção do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "na inserção de Utilizador"})
    })
})

router.get('/noticias/registar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    res.render('registarNoticia')
})

router.get('/noticias/listar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    
    res.render('listarNoticias')
})

router.get('/eventos/registar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    res.render('registarEvento')
})

router.get('/eventos/listar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    res.render('listarEventos')
})



module.exports = router;
