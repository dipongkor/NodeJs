"use strict";
(function (homeController) {
    homeController.init = function (app) {
        //var User = require('../documentDb').Models.User;
        var passport = require('passport');

        app.get('/', function (req, res) {
            res.render('index', { title: 'Express' });
        });
        
        app.post('/me', passport.authenticate('bearer', { session: false }),
            function (req, res) {
            res.send({ message: 'ok' });
        });
    };
})(module.exports);