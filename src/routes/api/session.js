var md5 = require('md5');
var Account = require('../../model/account');
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
    Account
      .findOne({email: email})
      .select('password salt')
      .exec()
      .then((doc) => {
        if (doc) {
          const salt = doc.salt;
          if (doc.password === md5(password + salt)) {
            res.json({
              success: true,
              message: '登录成功'
            });
            return ;
          }
        }
        res.json({
          success: false,
          message: '账号或密码错误'
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          message: err
        });
      });
  })
}
