var express = require('express')
var router = express.Router()
var Users = require('../controllers/user')
var User = require('../models/user')

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('register')
})

router.post('/register', (req,res,next) =>{
  var username = req.body.id
  var nome = req.body.name
  var mail = req.body.email
  var pass = req.body.password
  var type = req.body.userType
  var user = new User({
      _id: username,
      password: pass,
      name: nome,
      email: mail,
      userType: type
  })
  user.save()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

router.get('/api',(req,res) => {
  res.render('admin')
})

router.get('/api/user', (req, res) => {
  Users.list()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

router.get('/api/user/:id', (req, res) => {
  Users.getUserID(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router
