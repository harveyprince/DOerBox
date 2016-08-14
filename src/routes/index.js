var express = require('express');
var router = express.Router();

//user identity check
router.all('/home', function (req, res, next) {
    var sess = req.session;
    if (sess.account_id) {
        next();
    } else {
        res.redirect('/');
    }
});
/* GET home page. */
//sign in page
router.get('/', function (req, res, next) {
    res.render('sign/index');
});
//sign up page
router.get('/sign_up', function (req, res, next) {
    res.render('sign/sign_up');
});
//home page
router.get('/home', function (req, res, next) {
    res.render('home/index');
});

router.get('/test', function (req, res, next) {
    res.render('test');
});

module.exports = router;
