var AuthenticationController = require('./controllers/authentication'),
    TodoController = require('./controllers/todos'),
    MessageController = require('./controllers/messagging'),
    FriendshipController = require('./controllers/friendship'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false }),
    requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        todoRoutes = express.Router(),
        messageRoutes = express.Router();
    friendshipRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    authRoutes.get('/protected', requireAuth, function (req, res) {
        res.send({ content: 'Success' });
    });

    // Todo Routes
    apiRoutes.use('/todos', todoRoutes);

    todoRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['reader', 'creator', 'editor']), TodoController.getTodos);
    todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['creator', 'editor']), TodoController.createTodo);
    todoRoutes.delete('/:todo_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), TodoController.deleteTodo);

    // MessageRoutes

    apiRoutes.use('/message', messageRoutes);

    messageRoutes.post('/getmessages', MessageController.getMessages);
    messageRoutes.post('/getlocatedmessages', MessageController.getLocatedMessages)
    messageRoutes.post('/savemessage', MessageController.createMessage);

    // FriendshipRoutes

    apiRoutes.use('/friendship', friendshipRoutes);

    friendshipRoutes.get('/getallusers', FriendshipController.getAllUsers);
    friendshipRoutes.get('/getfriends', FriendshipController.getFriends);
    friendshipRoutes.post('/sendfriendrequest', FriendshipController.sendFriendRequest);
    friendshipRoutes.post('/acceptfriendrequest', FriendshipController.acceptFriendRequest);

    // Set up routes
    app.use('/api', apiRoutes);

}