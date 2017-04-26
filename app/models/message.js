var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    geo: {
        type: [Number],
        index: '2d'
    },
    reiceved: {
        type: Boolean,
        default: false
    },
    reception: {
        type: Date,
        default: Date.now
    },
    creationDateUtc: {
        type: Date,
        default: Date.now
    },
    lastUpdateDateUtc: {
        type: Date,
        dafault: Date.now
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    text: {
        type: String,
        required: false
    }

}, {
        timestamps: true
    });


module.exports = mongoose.model('Message', MessageSchema);