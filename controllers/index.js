"use strict";
(function (controllers) {
    var homeController = require('./homeController');
    var authController = require('./authController');
    var categoryCtrl = require('./categoryCtrl');
    var discountCtrl = require('./discountCtrl');

    controllers.init = function (app) {
        homeController.init(app);
        authController.init(app);
        categoryCtrl.init(app);
        discountCtrl.init(app);
    };

})(module.exports);