var express = require('express')
var router = express.Router()
var axios = require('axios')
var passport = require('passport')




router.get('/',passport.authenticate('isConsumidor',{session:false}),(req, res) => {
    res.render('consumidor')
})


// ******************************* Obras ***************************************

router.get('/obras/listar',passport.authenticate('isConsumidor',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/consumidor/obras/listar')
        .then(dados => {res.render('listarObras_Consumidor',{obras: dados.data})})
        .catch(erro => {
            console.log('Erro na listagem do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
    })
})

router.get('/obras/listar/obra/:obra',passport.authenticate('isConsumidor',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/consumidor/obras/listar/obra/' + req.params.obra)
        .then(dados => {res.render('listarObra_Consumidor',{obra: dados.data})})
        .catch(erro => {
            console.log('Erro na listagem do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
    })
})


// ******************************* Eventos ***************************************

router.get('/eventos/listar',passport.authenticate('isConsumidor',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/consumidor/eventos/listar')
         .then(dados => {
            res.render('listarEventos_Consumidor',{eventos: dados.data})})
         .catch(erro => {
                console.log('Erro na listagem de Eventos: ' + erro)
                res.render('error', {error: erro, message: "Erro na listagem de Eventos"})
         })
    
})

module.exports = router;
