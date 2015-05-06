'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../api/user/user.model');

// Passport Configuration
require('./local/passport').setup(User, config);
require('./ldap/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/ldap', require('./ldap'));

module.exports = router;
