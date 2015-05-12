var passport = require('passport');
var LdapStrategy = require('passport-ldapauth').Strategy;

exports.setup = function (User, config) {
  passport.use(new LdapStrategy({
      usernameField: 'username',
      passwordField: 'password',
      server: {
        url: 'ldap://newldap.256.makerslocal.org:389',
        searchBase: 'ou=People,dc=makerslocal,dc=org',
        searchFilter: '(uid={{username}})'
      }
    },
    function (ldapuser, done) {
      var user = new User({name: ldapuser.uid,
                       email: ldapuser.mail,
                       provider: "ldap",
                       role: "admin"});

      return done(null, user);
    }
  ));
};