var express = require('express')
var router = express.Router()
var axios = require('axios')
var passport = require('passport')




router.get('/',passport.authenticate('isConsumidor',{session:false}),(req, res) => {
    res.render('consumidor')
})





module.exports = router;
