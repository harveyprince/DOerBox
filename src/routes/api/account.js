var md5 = require('md5');
var Account = require('../../model/account');
var crypto = require('crypto');

module.exports = function (router) {
    var uri = '/account';

    router.get(uri, function (req, res, next) {
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
        Account
            .findOne({email: email})
            .select('email')
            .exec()
            .then((doc) => {
                if (doc) {
                    //already exist
                    res.json({
                        success: false,
                        message: '该邮箱账户已存在'
                    });
                } else {
                    //don't exist
                    //secure operation
                    const buf = crypto.randomBytes(16);
                    var salt = buf.toString('hex');
                    password = md5(password + salt);
                    var account = new Account({
                        email: email,
                        password: password,
                        salt: salt
                    });
                    return account.save();
                }
            })
            .then((doc) => {
                if (doc) {
                    res.json({
                        success: true,
                        message: '注册成功'
                    });
                }
            })
            .catch((err) => {
                console.log('err');
                console.log(err);
                res.json({
                    success: false,
                    message: err
                });
            });

    });
}
