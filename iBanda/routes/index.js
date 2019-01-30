var express = require('express')
var router = express.Router()
var axios = require('axios')
var passport = require('passport')
var jwt = require('jsonwebtoken')
var Noticia = require('../controllers/noticia')

/* GET home page. */
router.get('/', (req, res) => {
  Noticia.listarVisiveis()
         .then(dados => res.render('index',{noticias:dados}))
         .catch(erro => res.status(500).send('Erro na Listagem de Notícias: ' + erro))
})

router.get('/sobre', (req, res) => {
  res.render('sobre')
})

router.get('/contactos', (req, res) => {
  res.render('contactos')
})

router.get('/login', (req,res) => {
  res.render('login')
})

router.post('/login', async (req,res,next) => {
  passport.authenticate('login', async (err,user,info)=> {
      try {
          if(err || !user){
              const error = new Error('An Error Occured')
              return next(error);
          }
          req.login(user, {session: false}, async (error) => {
              if(error) return next(error)
              const myuser = {_id: user._id,userType: user.userType} 
              const token = jwt.sign({user: myuser}, 'pri2018')
              req.user.token = token
              req.session.token = token
              
              if(user.userType == 'Admin'){
                return res.redirect('/admin')
              }
              else{
                if(user.userType == 'Produtor'){
                  return res.redirect('/produtor')
                }
                else{
                  if(user.userType == 'Consumidor'){
                    return res.redirect('/consumidor')
                  }
                }
              }
          })
      } catch (error) {
          return next(error)
      }
  }) (req,res,next)
})

router.get('/logout',(req,res) => {
  req.session.destroy
  req.logout()
  res.redirect('/')
})



module.exports = router;
