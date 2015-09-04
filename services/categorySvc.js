"use strict";
(function (categorySvc) {
    var Category = require('../documentDb').Models.Category;

    categorySvc.add = function (category, next) {

        var newCategory = new Category({
            name: category.name,
            addedBy: category.addedBy,
            created: new Date(),
            modified: new Date() 
        });

        newCategory.save(function (err, category) {
            if (err) {
                console.log(err);
                next(err, null);
            } else {
                next(null, category);
            }
        });
    };

    categorySvc.update = function (category, next) {

    };

    categorySvc.delete = function (id, next) {

    };

    categorySvc.getById = function (id, next) {

    };

    categorySvc.getAll = function (take, skip, next) {

    };
})(module.exports);