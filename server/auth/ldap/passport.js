var passport = require('passport');
var LdapStrategy = require('passport-ldapauth').Strategy;
var ldap = require('ldapjs');

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
      var ldapclient = ldap.createClient({
        url: 'ldap://newldap.256.makerslocal.org'
      });
      var base = 'ou=groups,dc=makerslocal,dc=org';
      var opts = {
        scope: 'one',
        filter: '(&(uniqueMember=uid=' + ldapuser.uid + ',ou=people,dc=makerslocal,dc=org)(cn=treasurer))'
      };

      ldapclient.search(base, opts, function(err, ldapRes) {
        var userRole = "user";
        ldapRes.on('searchEntry', function (entry) {
          userRole = "admin";
        });
        ldapRes.on('end', function (result) {
          var user = new User({
            name: ldapuser.uid,
            email: ldapuser.mail,
            provider: "ldap",
            role: userRole
          });
          return done(null, user);
        });
      });
    }
  ));
};
