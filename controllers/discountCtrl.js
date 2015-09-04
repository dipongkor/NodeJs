"use strict";
(function (discountCtrl) {
    var passport = require('passport');
    var DiscountService = require('../services').DiscountService;

    discountCtrl.init = function (app) {
        app.post('/api/discount/add', 
            passport.authenticate('bearer', { session: false }),
            function (req, res) {
            DiscountService.add(req.body.discount, function (err, response) {
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