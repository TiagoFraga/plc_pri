var express = require('express')
var router = express.Router()
var axios = require('axios')
var passport = require('passport')




router.get('/',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    res.render('admin')
})

router.get('/regista',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    res.render('register')
})


router.post('/regista',passport.authenticate('isAdmin',{session:false}),(req, res) => {
    console.dir(req.body)
    axios.post('http://localhost:9009/api/admin', req.body)
        .then(()=> res.redirect('http://localhost:9009/admin'))
        .catch(erro => {
            console.log('Erro na inserção do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "na inserção de Utilizador"})
        })
})


module.exports = router;
