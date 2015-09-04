"use strict";
(function (authConfig) {
    authConfig.strategies = {
        facebook: {
            clientID: '1421367444806270',
            clientSecret: '333e1642f72125deca7cccd76a3c8c2d',
            callbackURL: 'http://localhost:1337/auth/facebook/callback'
        }, 
        twitter: {
            consumerKey: 'get_your_own',
            consumerSecret: 'get_your_own',
            callbackURL: "http://127.0.0.1:1337/auth/twitter/callback"
        },
        github: {
            clientID: 'get_your_own',
            clientSecret: 'get_your_own',
            callbackURL: "http://127.0.0.1:1337/auth/github/callback"
        },
        google: {
            returnURL: 'http://127.0.0.1:1337/auth/google/callback',
            realm: 'http://127.0.0.1:1337'
        },
        sharepoint: {
            appId: '8157c2b0-382b-40f7-803c-a30cdd5214f0',
            appSecret: 'aPuG3+qT71kbDPZJg0hvZ+YPoxgrFYGBLl/Cruf+XQU=',
            callbackURL: "http://localhost:1337/auth/sharepoint/callback"
        }
    };
})(module.exports);