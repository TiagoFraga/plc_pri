var express = require('express')
var router = express.Router()
var axios = require('axios')
var passport = require('passport')
var formidable = require('formidable')
var jsonfile = require('jsonfile')
var fs = require('fs')
var Evento = require('../controllers/evento')
var zip = require('express-easy-zip')
router.use(zip());


router.get('/',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    console.log('Token Admin ' + req.session.token)
    res.render('admin')
})

// ******************************* Utilizadores ***************************************

router.get('/users/registar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    res.render('registarUser')
})

router.get('/users/listar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/users/listar',{ headers: {"Authorization" : req.session.token}})
        .then(dados => {res.render('listaUsers',{users: dados.data}) })
        .catch(erro => {
            console.log('Erro na listagem do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
    })
})

router.get('/users/listar/tipo',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/users/listar/tipo/'+ req.query.tipo,{ headers: {"Authorization" : req.session.token}})
         .then(dados => {
            res.render('listaUsers',{users: dados.data})})
         .catch(erro => {
                console.log('Erro na listagem de Utilizadores: ' + erro)
                res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
         })
})

router.post('/users/registar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/users/registar', req.body,{ headers: {"Authorization" : req.session.token}})
        .then(()=> res.redirect('http://localhost:9009/admin/users/listar'))
        .catch(erro => {
            console.log('Erro na inserção do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na inserção de Utilizador"})
    })
})

router.post('/users/remover',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/users/remover', req.body,{ headers: {"Authorization" : req.session.token}})
        .then(()=> res.redirect('http://localhost:9009/admin/users/listar'))
        .catch(erro => {
            res.render('error', {error: erro, message: "Erro na remoção de Utilizador"})
    })
})

router.get('/users/atualizar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/users/atualizar/'+ req.query.username,{ headers: {"Authorization" : req.session.token}})
         .then(dados => {
            res.render('atualizaUser',{user: dados.data})})
         .catch(erro => {
                console.log('Erro ao gerar página de atualizar: ' + erro)
                res.render('error', {error: erro, message: "Erro ao gerar página de atualizar Utilizador"})
         })
})

router.post('/users/atualizar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/users/atualizar', req.body,{ headers: {"Authorization" : req.session.token}})
        .then(()=> res.redirect('http://localhost:9009/admin/users/listar'))
        .catch(erro => {
            console.log('Erro na atualização do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na atualização do Utilizador"})
    })
})

// ******************************* Obras ***************************************

router.get('/obras/listar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/obras/listar',{ headers: {"Authorization" : req.session.token}})
        .then(dados => {res.render('listarObras',{obras: dados.data})})
        .catch(erro => {
            console.log('Erro na listagem do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
    })
})

router.get('/obras/listar/obra/:obra',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/obras/listar/obra/' + req.params.obra,{ headers: {"Authorization" : req.session.token}})
        .then(dados => {res.render('listarObra',{obra: dados.data})})
        .catch(erro => {
            console.log('Erro na listagem do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
    })
})

router.get('/obras/listar/tipo',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/obras/listar/tipo/' + req.query.tipo,{ headers: {"Authorization" : req.session.token}})
        .then(dados => {res.render('listarObras',{obras: dados.data})})
        .catch(erro => {
            console.log('Erro na listagem do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
    })
})

router.post('/obras/remover',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/obras/remover', req.body,{ headers: {"Authorization" : req.session.token}})
        .then(()=> res.redirect('http://localhost:9009/admin/obras/listar'))
        .catch(erro => {
            console.log('Erro na inserção da Notícia: ' + erro)
            res.render('error', {error: erro, message: "Erro na inserção da Notícia"})
    })
})


router.get('/obras/exportar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
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


// ******************************* Noticias ***************************************


router.get('/noticias/registar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    res.render('registarNoticia')
})

router.post('/noticias/registar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    
    axios.post('http://localhost:9009/api/admin/noticias/registar', req.body,{ headers: {"Authorization" : req.session.token}})
        .then(()=> res.redirect('http://localhost:9009/admin/noticias/listar'))
        .catch(erro => {
            console.log('Erro na inserção da Notícia: ' + erro)
            res.render('error', {error: erro, message: "Erro na inserção da Notícia"})
    })
})


router.get('/noticias/listar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/noticias/listar',{ headers: {"Authorization" : req.session.token}})
         .then(dados => {
            res.render('listarNoticias',{noticias: dados.data})})
         .catch(erro => {
                console.log('Erro na listagem de Notícias: ' + erro)
                res.render('error', {error: erro, message: "Erro na listagem de Notícias"})
         })
})

router.post('/noticias/remover',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/noticias/remover', req.body,{ headers: {"Authorization" : req.session.token}})
        .then(()=> res.redirect('http://localhost:9009/admin/noticias/listar'))
        .catch(erro => {
            console.log('Erro na remoção da Notícia: ' + erro)
            res.render('error', {error: erro, message: "Erro na remoção da Notícia"})
    })
})

router.post('/noticias/visibilidade',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/noticias/visibilidade', req.body,{ headers: {"Authorization" : req.session.token}})
        .then(()=> res.redirect('http://localhost:9009/admin/noticias/listar'))
        .catch(erro => {
            console.log('Erro na alteração da visibilidade da Notícia: ' + erro)
            res.render('error', {error: erro, message: "Erro na alteração da Visibilidade"})
    })
})

router.get('/noticias/atualizar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/noticias/atualizar/'+ req.query.id,{ headers: {"Authorization" : req.session.token}})
         .then(dados => {
            res.render('atualizaNoticia',{noticias: dados.data})})
         .catch(erro => {
                console.log('Erro na listagem de Notícias: ' + erro)
                res.render('error', {error: erro, message: "Erro na listagem de Notícias"})
         })
})

router.post('/noticias/atualizar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    console.log(req.body)
    axios.post('http://localhost:9009/api/admin/noticias/atualizar', req.body,{ headers: {"Authorization" : req.session.token}})
        .then(()=> res.redirect('http://localhost:9009/admin/noticias/listar'))
        .catch(erro => {
            console.log('Erro na atualização da Notícia: ' + erro)
            res.render('error', {error: erro, message: "Erro na atualização da Notícia"})
    })
})



// ******************************* Eventos ***************************************


router.get('/eventos/registar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    res.render('registarEvento')
})

router.get('/eventos/inserir',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    res.render('inserirEvento')
})

router.get('/eventos/listar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/eventos/listar',{ headers: {"Authorization" : req.session.token}})
         .then(dados => {
            res.render('listarEventos',{eventos: dados.data})})
         .catch(erro => {
                console.log('Erro na listagem de Eventos: ' + erro)
                res.render('error', {error: erro, message: "Erro na listagem de Eventos"})
         })
    
})

router.post('/eventos/registar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/eventos/registar', req.body,{ headers: {"Authorization" : req.session.token}})
        .then(()=> res.redirect('http://localhost:9009/admin/eventos/listar'))
        .catch(erro => {
            console.log('Erro na inserção do Evento: ' + erro)
            res.render('error', {error: erro, message: "Erro na inserção do Evento"})
    })
})

router.post('/eventos/inserir',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    var form = new formidable.IncomingForm()
    form.parse(req,async (erro,fields,files)=>{
        if(!erro){
            var fenviado = files.ficheiro.path
            var fnovo = './public/uploadedGramatica/'+files.ficheiro.name
            fs.rename(fenviado,fnovo,(erro)=>{
            if(!erro){
                    jsonfile.readFile(fnovo,async(erro, eventos)=>{
                        if(!erro){
                            console.log(eventos)
                            for(var i in eventos){
                              await Evento.inserirPorFicheiro(eventos[i])
                                      .then(dados => console.log(dados))
                                      .catch(erro => res.status(500).send('Erro: Erro na inserção do Evento: ' + erro))
                            }
                            await res.redirect('http://localhost:9009/admin/eventos/listar')
                        }else{
                        console.log("Nao consegui ler o ficheiro ")
                        }
                    })
                }else{
                    console.log("Nao consegui renomear o ficheiro ")
                }
            })
        }else{
            console.log("Nao consegui fazer o parse do ficheiro ")
        }
    })
})

router.post('/eventos/remover',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/eventos/remover', req.body,{ headers: {"Authorization" : req.session.token}})
        .then(()=> res.redirect('http://localhost:9009/admin/eventos/listar'))
        .catch(erro => {
            console.log('Erro na inserção da Notícia: ' + erro)
            res.render('error', {error: erro, message: "Erro na inserção da Notícia"})
    })
})

router.get('/eventos/atualizar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/eventos/atualizar/'+ req.query.id,{ headers: {"Authorization" : req.session.token}})
         .then(dados => {
            console.log(dados.data)
            res.render('atualizaEvento',{evento: dados.data})})
         .catch(erro => {
                console.log('Erro ao gerar página de Atualização do Evento: ' + erro)
                res.render('error', {error: erro, message: "Erro ao gerar página de Atualização do Evento"})
         })
})

router.post('/eventos/atualizar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/eventos/atualizar', req.body,{ headers: {"Authorization" : req.session.token}})
        .then(()=> res.redirect('http://localhost:9009/admin/eventos/listar'))
        .catch(erro => {
            console.log('Erro na atualização do Evento: ' + erro)
            res.render('error', {error: erro, message: "Erro na atualização do Evento"})
    })
})

router.get('/eventos/exportar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/eventos/listar',{ headers: {"Authorization" : req.session.token}})
         .then(dados => {
             var data = new Date()
             var file = './public/data/eventos/eventos_' + data + '.json' 
             jsonfile.writeFile(file,dados.data,(erro)=>{
                if(!erro){
                    res.zip({
                        files: [
                            {},
                            // nome da pasta para fazer o zip
                            { 
                              path: file,
                              name: 'eventos_' + data + '.json'
                            } 
                        ],
                        // nome do zip
                        filename: 'eventos_' + data + '.zip'
                    })
                }else{
                    console.log("O ficheiro ja está criado")
                }
             })
           })
         .catch(erro => {
                console.log('Erro na exportação de Eventos: ' + erro)
                res.render('error', {error: erro, message: "Erro na listagem de Eventos"})
         })
    
})

// ******************************* Logs ***************************************

router.get('/logs/listar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    var file = './public/data/logs/logs.json'
    jsonfile.readFile(file,(erro,data)=>{
       if(!erro){
           res.render('listarLogs',{logs: data})
       }else{
           res.render('error', {error: erro, message: "Erro na listagem dos logs"})
       } 
    })
})


router.get('/logs/exportar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    var data = new Date()
    var file = './public/data/logs/logs.json'
    res.zip({
        files: [
            {},
            // nome da pasta para fazer o zip
            { 
              path: file,
              name: 'logs_' + data + '.json'
            } 
        ],
        // nome do zip
        filename: 'logs_' + data + '.zip'
    })
})




module.exports = router;
