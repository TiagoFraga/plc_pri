var express = require('express')
var router = express.Router()
var axios = require('axios')
var passport = require('passport')




router.get('/',passport.authenticate('isProdutor',{session:false}),(req, res) => {
    res.render('produtor')
})





module.exports = router;
