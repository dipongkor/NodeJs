"use strict";
(function (authController) {
    authController.init = function (app) {

        var passport = require('passport');
        var UserService = require('../services').UserService;

        app.get('/auth/facebook', 
            passport.authenticate('facebook', { session: false, scope: [] }), 
            function (req, res) {
        });

        app.get('/auth/facebook/callback', 
            passport.authenticate('facebook', { session: false, failureRedirect: '/' }),
            function (req, res) {
            res.send(req.user.access_token);
        });

        app.get('/account', passport.authenticate('bearer', { session: false }),
             function (req, res) {
            res.render('account', { user: req.user });
        });

        app.post('/api/auth/register', function (req, res) {
            UserService.add(req.body.user, function (err, response) {
                if (err) {
                    res.send({
                        code: -1,
                        error: err,
                        data: null
                    });
                } else {
                    res.send({
                        code: 1,
                        error: null,
                        data: response
                    });
                }
            });
        });

        app.post('/api/auth/login', function (req, res) {
            UserService.validateCredential(req.body.credential, function (err, user) {
                if (err) {
                    console.log(err);
                    res.send({
                        code: -1,
                        error: err,
                        data: -1
                    });
                } else {
                    var userData = user.toObject();
                    delete userData['password'];
                    console.log(userData);
                    res.send({
                        code: 1,
                        error: null,
                        data: userData
                    });
                }
            });
        });
    };
})(module.exports);