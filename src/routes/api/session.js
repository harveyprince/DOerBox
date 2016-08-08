module.exports = function(router) {
  var uri = '/session';
  router.get(uri, function(req, res, next) {
    res.render('sign/index');
  });

  //#########################################
  var web_uri = '/web/session';
  router.post(web_uri, (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    
  })
}
