/**
 * Created by harveyprince on 16/8/11.
 */
'use strict';
var User = require('../../model/user');
module .exports = function(router) {
    var uri = '/todo';
    //#####################################
    var web_uri = '/web/todo';
    //account check
    router.all(web_uri, (req, res, next) => {
        var sess = req.session;
        let account_id = sess.account_id;
        if (account_id) {
            next();
        } else {
            res.json({
                success: false,
                message: '未通过身份验证'
            });
        }
    });
    router.post(web_uri, (req, res, next) => {
        var sess = req.session;
        let account_id = sess.account_id;

        var content = req.body.content;
        if (!content) {
            res.json({
                success: false,
                message: '内容不得为空'
            });
            return ;
        }
        User
            .findOne({
                _accountId: account_id
            })
            .exec()
            .then((doc)=>{
                if (doc) {
                    //already
                    return doc;
                } else {
                    //create a new one
                    var user = new User({
                        _accountId: account_id
                    });
                    return user.save();
                }
            })
            .then((doc)=>{
                var todo = doc.todos.create({
                    content: content,
                });
                doc.todos.push(todo);
                doc.save();
                return todo;
            })
            .then((doc)=>{
                console.log("todo");
                console.log(doc);
                if (doc) {
                    res.json({
                        success: true,
                        todo: doc
                    });
                }
            })
            .catch((err)=>{
                res.json({
                    success: false,
                    message: err
                })
            })
        ;

    });

    router.delete(web_uri, (req, res, next) => {
        var sess = req.session;
        let account_id = sess.account_id;

        let _id = req.body._id;
        if (!_id) {
            res.json({
                success: false,
                message: '标识码不能为空'
            });
        }
        User
            .findOne({
                _accountId: account_id
            })
            .exec()
            .then((doc) => {
                if (doc) {
                    //already
                    return doc;
                } else {
                    //create a new one
                    var user = new User({
                        _accountId: account_id
                    });
                    return user.save();
                }
            })
            .then((doc) => {
                doc.todos.id(_id).remove();
                return doc.save();
            })
            .then((doc) => {
                if (doc) {
                    res.json({
                        success: true,
                        message: '删除成功'
                    });
                }
            })
            .catch((err) => {
                res.json({
                    success: false,
                    message: err
                });
            });
    });
}