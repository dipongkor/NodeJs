
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path1');
var controllers = require('./controllers');
var authConfig = require('./modules/configs').authConfig;
var passport = require('passport');
var User = require('./documentDb').Models.User;
var FacebookStrategy = require('passport-facebook').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.session({ secret: 'my_precious' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new FacebookStrategy(authConfig.strategies.facebook, 
    function (accessToken, refreshToken, profile, done) {
    User.findOne({ facebookId: profile.id }, 
        function (err, result) {
        if (err) {
            console.log(err);
            done(err, null);
        }
        if (!err && result != null) {
            done(null, result);
        } else {
            var newUser = new User({
                facebookId : profile.id,
                access_token: accessToken,
                name: profile.displayName,
                email: profile.emails[0].value
            });
            newUser.save(function (err) {
                if (err) {
                    console.log(err);
                    done(err, null);
                } else {
                    done(null, newUser);
                }
            });
        }
    }
    );
}));


passport.use(  
    new BearerStrategy(
        function (token, done) {
            User.findOne({ access_token: token },
                function (err, user) {
                if (err) {
                    return done(err)
                }
                if (!user) {
                    return done(null, false)
                }
                return done(null, user, { scope: 'all' });
            });
        }
    ));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// Route Mapping
controllers.init(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
