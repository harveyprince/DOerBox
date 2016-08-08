var express = require('express');
var router = express.Router();

/* GET home page. */
//sign in page
router.get('/', function(req, res, next) {
  res.render('sign/index');
});
//sign up page
router.get('/sign_up', function(req, res, next) {
  res.render('sign/sign_up');
});
//home page
router.get('/home', function(req, res, next) {
  res.render('home/index');
});

module.exports = router;
