var User = require('../models/user');



exports.getAllUsers = function (res, next) {


    User.find({}, function (err, users) {
        if (err) {
            return next(err);
        } else {
            return res.json(users);
        }
    });

}