var passport = require('passport')
var localStrategy = require('passport-local').Strategy
var JWTstrategy = require('passport-jwt').Strategy
var ExtractJWT = require('passport-jwt').ExtractJwt
var UserModel = require('../models/user')


// Login de Utilizador
passport.use('login',new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
},async (u,p,done) =>{
    try{
        user = await UserModel.findOne({_id: u})
        if(!user){
            return done(null,false,{message: 'Utilizador não encontrado!'})
        }
        var valida = await user.isValidPassword(p)
        if(!valida) return done(null,false,{message: 'Password inválida!'})

        return done(null,user,{message: 'Utilizador autenticado!'})
    }
    catch(erro){
        done(erro)
    }
}))

//configurar a serialização do utilizador
passport.serializeUser((user, done)=>{
    done(null, user.username)
 })
  
passport.deserializeUser(function(user, done) {
    UserModel.findOne({username : user.username}, function(err, user) {
        if (err) done(err, null);
        done(null, user)
    })
})
  

// Verificação do Token
var extractFromSession = (req) => {
    var token = null
    if(req && req.session) token = req.session.token
    if(!token && req.headers.authorization) token = req.headers.authorization
    return token
}

passport.use('isAdmin',new JWTstrategy({
    secretOrKey: "pri2018",
    jwtFromRequest: ExtractJWT.fromExtractors([extractFromSession]),
    passReqToCallback: true
},async(req,token,done)=>{
    try {

        if(token.user.userType == 'Admin'){
            return done(null,token.user)
        } 
        else{
            return done(null,false,{message: 'Não têm permissões para aceder a esta Página'})
        }
    } catch (error) {
        return done(erro)
    }
}))

passport.use('isProdutor',new JWTstrategy({
    secretOrKey: "pri2018",
    jwtFromRequest: ExtractJWT.fromExtractors([extractFromSession])
},async(token,done)=>{
    try {
        if(token.user.userType == 'Produtor'){
            return done(null,token.user)
        } 
        else{
            return done(null,false,{message: 'Não têm permissões para aceder a esta Página'})
        }
    } catch (error) {
        return done(erro)
    }
}))


passport.use('isConsumidor',new JWTstrategy({
    secretOrKey: "pri2018",
    jwtFromRequest: ExtractJWT.fromExtractors([extractFromSession])
},async(token,done)=>{
    try {
        if(token.user.userType == 'Consumidor'){
            return done(null,token.user)
        } 
        else{
            return done(null,false,{message: 'Não têm permissões para aceder a esta Página'})
        }
    } catch (error) {
        return done(erro)
    }
}))


