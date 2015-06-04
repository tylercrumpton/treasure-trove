'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var ldap = require('ldapjs');

var ldapclient = ldap.createClient({
  url: 'ldap://newldap.256.makerslocal.org'
});

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  var opts = {
    scope: 'one',
    filter: '(objectClass=Maker)'};
  var base = 'ou=People,dc=makerslocal,dc=org';  
  ldapclient.search(base, opts, function(err, ldapRes) {
    var userList = [];
    console.log(ldapRes);
    ldapRes.on('searchEntry', function(entry) {
      var user = {realname:entry.object.displayName, username:entry.object.uid, email:entry.object.mail};
      userList.push(user);
    });
    ldapRes.on('error', function(err) {
      return res.send(500, err);
    });
    ldapRes.on('end', function(result) {    
      if (result.status == 0) {
        res.json(200, userList);
      } else { 
        return res.send(500, err);
      }
    });
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  res.json(req.user);
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
