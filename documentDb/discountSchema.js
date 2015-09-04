"use strict";
(function (discountSchema) {

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var passwordHash = require('password-hash');
    // User Schema Start
    var user = new Schema({
        name: { type: String },
        userId: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        access_token: { type: String, unique: true, required: true },
        avatar: { type: String },
        password: { type: String, unique: true, required: true },
        userName: { type: String, unique: true, required: true },
        votes: {up: Number, down: Number}
    });
    
    user.pre('save', function (next) {
        var self = this;
        if (passwordHash.isHashed(self.password)) {
           return next();
        } else {
            self.password = passwordHash.generate(self.password);
            next();
        }
    });
    
    user.methods.comparePassword = function (password, next) {
        var self = this;
        if (passwordHash.verify(password, self.password)){
            next(true);
        } else {
            next(false);
        }
    };
    // User Schema End
    
    // Category Schema Start
    var category = new Schema({
        name: { type: String, unique: true, index: true },
        addedBy: { type: String },
        created: { type: Date, defult: Date.now },
        modified: { type: Date, defult: Date.now },
    });
    // Category Schema End
    
    // Discount Schema Start
    var discount = new Schema({
        discountId: { type: String, unique: true, required: true },
        title: { type: String, index: true },
        description: { type: String, index: true },
        categories: [],
        created: { type: Date, defult: Date.now },
        vote: { up : [], down: [] },
        addedBy: {},
        views: { Type: Number },
        comments: [{ body: String, date: Date, by: { name: String, userId: Number, avatar: String, votes: { up: [], down: [] } } }],
        providerLink: { type: String },
        attachments: []
    });
    
    discount.pre('save', function (next) {
        var self = this;
        discountSchema.User.findOne({ access_token: self.addedBy },'-password -access_token', function (err, user) {
            if (err) {
                console.log(err);
                return  next(err);
            }
            if (!user) {
              return  next(new Error("User not found"));
            }
            var userData = user.toObject();
            self.addedBy = userData;
            return next();
        });
    });

    // Discount Schema End
    
    discountSchema.User = mongoose.model('User', user);
    discountSchema.Category = mongoose.model('Category', category);
    discountSchema.Discount = mongoose.model('Discount', discount);
     
})(module.exports); 