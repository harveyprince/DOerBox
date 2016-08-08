var express = require('express');
var router = express.Router();
var session = require('./session');
var account = require('./account');

/* dispatch uri. */
session(router);
account(router);


module.exports = router;
