var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign/index');
});

router.get('/sign_up', function(req, res, next) {
  res.render('sign/sign_up');
});

module.exports = router;
