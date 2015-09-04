"use strict";
(function (discountSvc) {
    var Discount = require('../documentDb').Models.Discount;
    var guid = require('node-uuid');

    discountSvc.add = function (discount, next) {
        var newDiscount = new Discount({
            discountId: guid.v4(),
            title: discount.title,
            description: discount.description,
            categories: discount.categories,
            created: new Date(),
            vote: { up : [], down: [] },
            addedBy: discount.addedBy,
            views: 0,
            comments: [],
            providerLink: discount.providerLink,
            attachments: discount.attachments || []
        });

        newDiscount.save(function (err, discount) { 
            if (err) {
                console.log(err);
                next(err, null);
            } else {
                next(null, discount);
            }
        });
    };
})(module.exports);