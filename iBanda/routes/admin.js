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

router.get('/users/atualizar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    console.log(req.query.username)
    axios.get('http://localhost:9009/api/admin/users/atualizar/'+ req.query.username)
         .then(dados => {
            res.render('atualizaUser',{user: dados.data})})
         .catch(erro => {
                console.log('Erro ao gerar página de atualizar: ' + erro)
                res.render('error', {error: erro, message: "Erro ao gerar página de atualizar Utilizador"})
         })
})

router.post('/users/atualizar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/users/atualizar', req.body)
        .then(()=> res.redirect('http://localhost:9009/admin/users/listar'))
        .catch(erro => {
            console.log('Erro na atualização do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na atualização do Utilizador"})
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
            console.log('Erro na remoção da Notícia: ' + erro)
            res.render('error', {error: erro, message: "Erro na remoção da Notícia"})
    })
})

router.post('/noticias/visibilidade',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/noticias/visibilidade', req.body)
        .then(()=> res.redirect('http://localhost:9009/admin/noticias/listar'))
        .catch(erro => {
            console.log('Erro na alteração da visibilidade da Notícia: ' + erro)
            res.render('error', {error: erro, message: "Erro na alteração da Visibilidade"})
    })
})

router.get('/noticias/atualizar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/noticias/atualizar/'+ req.query.id)
         .then(dados => {
            res.render('atualizaNoticia',{noticias: dados.data})})
         .catch(erro => {
                console.log('Erro na listagem de Notícias: ' + erro)
                res.render('error', {error: erro, message: "Erro na listagem de Notícias"})
         })
})

router.post('/noticias/atualizar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    console.log(req.body)
    axios.post('http://localhost:9009/api/admin/noticias/atualizar', req.body)
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

router.get('/eventos/atualizar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/admin/eventos/atualizar/'+ req.query.id)
         .then(dados => {
            console.log(dados.data)
            res.render('atualizaEvento',{evento: dados.data})})
         .catch(erro => {
                console.log('Erro ao gerar página de Atualização do Evento: ' + erro)
                res.render('error', {error: erro, message: "Erro ao gerar página de Atualização do Evento"})
         })
})

router.post('/eventos/atualizar',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/admin/eventos/atualizar', req.body)
        .then(()=> res.redirect('http://localhost:9009/admin/eventos/listar'))
        .catch(erro => {
            console.log('Erro na atualização do Evento: ' + erro)
            res.render('error', {error: erro, message: "Erro na atualização do Evento"})
    })
})



module.exports = router;
