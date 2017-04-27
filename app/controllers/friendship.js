var User = require('../models/user');
var Friendship = require('../models/friendship');


exports.getAllUsers = function (req, res, next) {

    User.find({}, function (err, users) {
        if (err) {
            return next(err);
        } else {
            return res.json(users);
        }
    });

}

exports.getFriends = function (req, res, next) {

    Friendship.find({ request_to: req.body._id, accepted: true },
        function (err, friendships) {
            if (err) {
                return next(err);
            } else {

                console.log("entrato" + friendships.length + " daje");

                friendships.forEach(function (err, friend) {

                    User.findOne({ _id: friend.friend_id },
                        function (err, user) {
                            if (err) {
                                return next(err);
                            } else {
                                res.json(user);
                            }
                        }
                    )
                })

                return res;

            }
        });
}

exports.sendFriendRequest = function (req, res, next) {

    var friendship = new Friendship(
        request_to = req.body.request_id,
        friend_id = req.body.friend_id,
        accepted = false
    )

    friendship.save(function (err, friendship) {

        if (err) {
            return next(err);
        }
        else {
            return res.json(friendship);
        }

    });

}

exports.acceptFriendRequest = function (req, res, next) {

    Friendship.findOneAndUpdate({
        _id: req.body_id
    }, req.body, function (err, friendship) {
        if (err) {
            return next(err);
        } else {
            return res.json(friendship);
        }
    });
}