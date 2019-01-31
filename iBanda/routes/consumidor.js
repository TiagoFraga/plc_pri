var express = require('express')
var router = express.Router()
var axios = require('axios')
var jsonfile = require('jsonfile')
const updateJsonFile = require('update-json-file')
var passport = require('passport')
var zip = require('express-easy-zip')
router.use(zip());



router.get('/',passport.authenticate('isConsumidor',{session:false}),(req, res) => {
    res.render('consumidor')
})


// ******************************* Obras ***************************************

router.get('/obras/listar',passport.authenticate('isConsumidor',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/consumidor/obras/listar',{ headers: {"Authorization" : req.session.token}})
        .then(dados => {
            atualizaVisualizacoes()
            res.render('listarObras_Consumidor',{obras: dados.data})
        })
        .catch(erro => {
            console.log('Erro na listagem do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
    })
})

router.get('/obras/listar/obra/:obra',passport.authenticate('isConsumidor',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/consumidor/obras/listar/obra/' + req.params.obra,{ headers: {"Authorization" : req.session.token}})
        .then(dados => {res.render('listarObra_Consumidor',{obra: dados.data})})
        .catch(erro => {
            console.log('Erro na listagem do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
    })
})

router.get('/obras/listar/tipo',passport.authenticate('isConsumidor',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/consumidor/obras/listar/tipo/' + req.query.tipo,{ headers: {"Authorization" : req.session.token}})
        .then(dados => {res.render('listarObras_Consumidor',{obras: dados.data})})
        .catch(erro => {
            console.log('Erro na listagem do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
    })
})

router.get('/obras/exportar',passport.authenticate('isConsumidor',{session:false}),(req, res) => {
    atualizaDownloads()
    var dirPath = __dirname + "/../public/catalogo/" + req.query.id;
    res.zip({
        files: [
            {},
            // nome da pasta para fazer o zip
            { 
              path: dirPath,
              name: req.query.id 
            } 
        ],
        // nome do zip
        filename: req.query.id + '.zip'
    })
})


// ******************************* Eventos ***************************************

router.get('/eventos/listar',passport.authenticate('isConsumidor',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/consumidor/eventos/listar',{ headers: {"Authorization" : req.session.token}})
         .then(dados => {
            res.render('listarEventos_Consumidor',{eventos: dados.data})})
         .catch(erro => {
                console.log('Erro na listagem de Eventos: ' + erro)
                res.render('error', {error: erro, message: "Erro na listagem de Eventos"})
         })
    
})

// ******************************* Extra ***************************************

function atualizaVisualizacoes(){
    var file = './public/data/logs/logs.json'
    updateJsonFile(file, (data) => {
        data.total.visualizacoes = data.total.visualizacoes + 1
        data.consumidor.visualizacoes = data.consumidor.visualizacoes + 1    
        return data
    })
}

function atualizaDownloads(){
    var file = './public/data/logs/logs.json'
    updateJsonFile(file, (data) => {
        data.total.downloads = data.total.downloads + 1  
        data.consumidor.downloads = data.consumidor.downloads + 1 
        return data
    }) 
}



module.exports = router;
