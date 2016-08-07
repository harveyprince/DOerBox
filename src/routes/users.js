var express = require('express');
var router = express.Router();
var User = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = new User({
      nick: 'Harveyprince'
  });
  user.save((err)=>{
      console.log(err);
  });
  res.send('respond with a resource');
});

module.exports = router;
