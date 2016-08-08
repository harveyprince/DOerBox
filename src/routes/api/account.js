var md5 = require('md5');
var Account = require('../../model/account');

module.exports = function(router) {
  var uri = '/account';

  router.get(uri, function(req, res, next) {
    res.render('sign/index');
  });
  router.post(uri, (req, res, next) => {

  });
  //#############################################
  var web_uri = '/web/account';
  //web api
  router.get(web_uri, (req, res, next) => {

  });
  router.post(web_uri, (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    var account = new Account({
      email:email,
      password:password,
      salt:''
    });
    console.log(password);
    res.json({password:password});
  });
}
