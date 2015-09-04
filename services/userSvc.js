"use strict";
(function (userSvc) {
    
    var User = require('../documentDb').Models.User;
    var guid = require('node-uuid');

    userSvc.add = function (user, next) {
        var newUser = new User({
            name : user.name,
            email: user.email,
            access_token: user.access_token || guid.v4(),
            avatar: user.avatar,
            password: user.password,
            userId: guid.v4(),
            userName: user.userName
        });
        newUser.save(function (err, user) {
            if (err) {
                console.log(err);
                next(err, null);
            } else {
                next(null, user);
            }
        });
    };

    userSvc.validateCredential = function (credential, next) {
        User.findOne({ email: credential.email }, function (err, user) {
            if (err) {
                next(err, null);
            }

            if (!user) {
                next(new Error("User not found"), null);
            }

            user.comparePassword(credential.password, function (result) {
                if (result) {
                    next(null, user);
                } else {
                    next(new Error("Password does not match"), null);
                }
            });
        });
    };
})(module.exports);