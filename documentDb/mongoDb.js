"use strict";
(function (mongoDb) {
    var mongoose = require('mongoose');
    mongoDb.init = function (mongoUrl){
        mongoose.connect(mongoUrl);
    }
})(module.exports);