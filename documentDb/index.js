"use strict";
(function (documentDb) {
    var config = require('../modules/configs');
    var mongoDb = require('./mongoDb');
    var discountSchema = require('./discountSchema');
    console.log("connecting database" + config.appSetting.dbUrl);
    mongoDb.init(config.appSetting.dbUrl);
    console.log("connection successful");
    documentDb.Models = discountSchema;
})(module.exports);