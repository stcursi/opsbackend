var Message = require('../models/message');

exports.createMessage = function (req, res, next) {

    sender: req.body.sender;
    receiver: req.body.receiver;
    text: req.body.text;
    photo: req.body.photo;
    reception: req.body.reception;
    longitude: req.body.longitude;
    latitude: req.body.latitude;
    received: req.body.received; 
    creationDateUtc: req.body.creationDateUtc;
    lastUpdateUtc: req.body.lastUpdateUtc;

    if (!receiver) {
        return res.status(422).send({ error: 'You must enter a receiver' });
    }

    if (!longitude || !latitude) {
        return res.status(422).send({ error: 'You must enter a valid geolocation' });
    }

    var message = new Message({
        sender: sender,
        receiver: receiver,
        latitude: latitude,
        longitude: longitude,
        received: received,
        reception: reception,
        creationDateUtc: creationDateUtc,
        lastUpdateUtc: lastUpdateUtc,
        photo: photo,
        text: text
    })

    message.save(function (err, message) {

        if (err) {
            return next(err +" -"+ message);
        }
        else {
            return res.json(message);
        }

    });


}

exports.getMessages = function (req, res, next) {

    idReceiver = req.body._id;

    Message.find({
        receiver: idReceiver
    }, function (err, messages) {
        if (err) {
            return next(err);
        } else {
            return res.json(messages);
        }
    });

}