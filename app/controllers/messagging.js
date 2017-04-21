var Message = require('../models/message');

exports.createMessage = function (req, res, next) {

    var sender = req.body.sender;
    var receiver = req.body.receiver;
    var text = req.body.text;
    var photo = req.body.photo;
    var reception = req.body.reception;
    var longitude = req.body.longitude;
    var latitude = req.body.latitude;
    var received = req.body.received;
    var creationDateUtc = req.body.creationDateUtc;
    var lastUpdateUtc = req.body.lastUpdateUtc;

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

        console.log(message)

        if (err) {
            return next(err);
        }
        else {
            return res.json(message);
        }

    });


}

exports.getMessages = function (req, res, next) {

    var idReceiver = req.body._id;

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