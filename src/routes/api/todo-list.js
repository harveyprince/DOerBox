/**
 * Created by harveyprince on 16/8/11.
 */
'use strict';
var User = require('../../model/user');
module.exports = function (router) {
    var uri = '/todo_list';
    var web_uri = '/web/todo_list';
    router.get(web_uri, (req, res, next)=> {
        var sess = req.session;
        let account_id = sess.account_id;
        if (account_id) {
            User
                .findOne({
                    _accountId: account_id
                })
                .select('todos')
                .exec()
                .then((doc)=> {
                    if (doc) {
                        res.json({
                            success: true,
                            todos: doc.todos
                        });
                    } else {
                        res.json({
                            success: false,
                            todos: '无用户数据'
                        });
                    }
                })
                .catch((err)=> {
                    res.json({
                        success: false,
                        message: err
                    });
                });
        } else {
            res.json({
                success: false,
                message: '未通过身份验证'
            });
        }
    });
}