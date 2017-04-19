var Message = require('../models/message');

exports.createMessage = function (req, res, next) {

    sender: req.body.sender;
    receiver: req.body.receiver;
    reception: req.body.reception;
    longitude: req.body.longitude;
    latitude: req.body.latitude;
    received: req.body.received;g

    if (!receiver) {
        return res.status(422).send({ error: 'You must enter a receiver' });
    }

    if (!longitude || !latitude) {
        return res.status(422).send({ error: 'You must enter a valid geolocation' });
    }

    var message = new Message({
        sender: sender,
        receiver: receiver,
        reception: reception,
        longitude: longitude,
        latitude: latitude,
        received: received
    })

    message.save(function (err, message) {

        if (err) {
            return next(err);
        }
        else {
            return res.json(message);
        }

    });


}

exports.getMessages = function (req, res, next) {

    receiver = req.body.receiver;

    Message.find({
        receiver: receiver._id
    }, function (err, messages) {
        if (err) {
            return next(err);
        } else {
            return res.json(messages);
        }
    }); // end Team.find)

}