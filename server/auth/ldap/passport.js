var passport = require('passport');
var LdapStrategy = require('passport-ldapauth').Strategy;

exports.setup = function (User, config) {
  passport.use(new LdapStrategy({
      usernameField: 'username',
      passwordField: 'password',
      server: {
        url: 'ldap://ldap.forumsys.com:389',
        bindDn: 'cn=read-only-admin,dc=example,dc=com',
        bindCredentials: 'password',
        searchBase: 'ou=scientists',
        searchFilter: '(uid={{username}})'
      }  
    },
    function (user, done) {
      console.log(user);
      return done(null, user);
    }
  ));
};
