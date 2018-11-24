var express = require('express')
var router = express.Router()
var axios = require('axios')

router.get('/', (req, res) => {
    res.render('admin')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/list', (req,res) =>{
  axios.get('http://localhost:9009/api/users')
      .then(users => res.render('listUsers', {users: users.data}))
      .catch(erro => {
              console.log('Erro na listagem de Utilizadores: ' + erro)
              res.render('error', {error: erro, message: "na listagem de utilizadores"})
      })
})

router.get('/list/:id', function(req, res) {
    axios.get('http://localhost:9009/api/users/' + req.params.id)
      .then(u =>{ res.render('user', {user: u.data})
            console.dir(u.data)
    })
      .catch(erro => {
          console.log('Erro na consulta do Utilizador: ' + erro)
          res.render('error', {error: erro, message: "na consulta de Utilizador"})
      })
})

router.post('/register', (req, res) => {
    console.dir(req.body)
    axios.post('http://localhost:9009/api/users', req.body)
        .then(()=> res.redirect('http://localhost:9009/users'))
        .catch(erro => {
            console.log('Erro na inserção do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "na inserção de Utilizador"})
        })
})



module.exports = router;
