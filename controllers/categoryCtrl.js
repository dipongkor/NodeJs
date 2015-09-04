"use strict";
(function (categoryCtrl) {

    var passport = require('passport');
    var CategoryService = require('../services').CategoryService;

    categoryCtrl.init = function (app) {

        app.post('/api/category/add', 
            passport.authenticate('bearer', { session: false }),
             function (req, res) {

            var newCategory = {
                name: req.body.name,
                addedBy: req.body.access_token
            };

            CategoryService.add(newCategory, function (err, response) {
                if (err) {
                    console.log(err);
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
    };
})(module.exports);