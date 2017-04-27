var mongoose = require('mongoose');

var FriendshipSchema = new mongoose.Schema({

    request_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    friend_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accepted: {
        type:Boolean,
        default: false
    }
    
})

module.exports = mongoose.model('Friendship', FriendshipSchema);