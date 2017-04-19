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
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    reiceved: {
        type: Boolean,
        default: false
    },
    reception: {
        type: Date,
        default: Date.now
    }

}, {
        timestamps: true
    });


module.exports = mongoose.model('Message', MessageSchema);