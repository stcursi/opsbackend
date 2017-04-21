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
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
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