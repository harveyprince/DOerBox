var express = require('express');
var router = express.Router();
var test = require('./test');
var session = require('./session');
var account = require('./account');
var todo = require('./todo');
var todo_list = require('./todo-list');

/* dispatch uri. */
test(router);
session(router);
account(router);
todo(router);
todo_list(router);


module.exports = router;
