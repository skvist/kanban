var express = require('express'),
    jwt = require('jsonwebtoken'),
    mongoose    = require('mongoose'),
    config = require('./config'),
    User = require('./models/user'),
    bcrypt = require('bcrypt-nodejs'),
    uniqueValidator = require('mongoose-unique-validator');

var router = express.Router();

/* mongoose.connect(config.database, {useMongoClient: true }, (err) => {
    if (err) {
        res.json({ success: false, title: err.name, message: err.message });
    }
}); */

mongoose.Promise = global.Promise;
User.schema.plugin(uniqueValidator);

function dbconnect(res) {
    mongoose.connect(config.database, {useMongoClient: true }, (err) => {
        if (err) {
            res.json({ success: false, title: err.name, message: err.message });
        }
    });
}

/* Create a test user. */
router.get('/createuser', function(req, res) {
    dbconnect(res);
    var newUser = new User({
        username: 'doe',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '$2a$10$2M0xhE8Bri8Papos6TdFfusRBpme/SsAGg6VYQu3SqmFl/hgjJGO6',
        admin: false
    });

    newUser.save(function(err) {
        if (err) {
            console.log(err.message);
            res.json({
                success: false,
                title: err.name,
                message: err.message
            });
        } else {
            console.log('User doe created');
            res.json({ success: true, message: "User doe created!" });
        }
    });
    // res.json({ success: false, message: "User doe not created!" });
});

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('Placeholder for user endpoint');
});

/* GET all users. TODO: Remove */
router.get('/all', async (req, res) => {
    dbconnect(res);
    const showUsers = await User.find({}).select({'password': false, 'admin': false});

    res.json(showUsers);
});

/* GET one user. */
router.get('/show/:username', async (req, res) => {
    dbconnect(res);
    let username = req.params.username;
    const showUser = await User.findOne({ username }).select({'password': false, 'admin': false});

    res.json(showUser);
});

/* POST Insert user into db . */
router.post('/create', async (req, res) => {
    dbconnect(res);
    const data = req.body;

    var newUser = new User({
        username: data.username,
        name: data.name,
        email: data.email,
        password: bcrypt.hashSync(data.password),
        admin: false
    });

    newUser.save(function(err) {
        if (err) {
            console.log(err.message);
            res.json({
                success: false,
                title: err.name,
                message: err.message
            });
        } else {
            console.log('User created');
            res.json({
                success: true,
                title: 'UserCreated',
                message: `User ${data.username} created.`
            });
        }
    });
});

/* POST Insert user into db . */
router.post('/update', async (req, res) => {
    res.send('Placeholder for Update a user.');
});

/* DELETE Insert user into db . */
router.delete('/delete/:id', async (req, res) => {
    dbconnect(res);
    res.send('Placeholder for Delete a user.');
});

/* POST Login, return a JWT token */
router.post('/login', async (req, res) => {
    dbconnect(res);
    const username = req.body.username;
    const password = req.body.password;

    console.log(username);

    if (!username) {
        res.json({
            success: false,
            title: 'NoUsernameProvided',
            message: `No username provided.`
        });
    } else if (!password) {
        res.json({
            success: false,
            title: 'NoPasswordProvided',
            message: `No password provided.`
        });
    } else {
        User.findOne({ username }, function(err, users) {
            if (err) {
                res.json({
                    success: false,
                    title: err.name,
                    message: err.message
                });
            } else if (!users) {
                res.json({
                    success: false,
                    title: 'LoginFailed',
                    message: 'Login failed, no user found'
                });
            } else {
                let correctPassword = bcrypt.compareSync(password, users.password);

                if (correctPassword) {
                    const payload = {
                        username: users.username,
                        admin: users.admin
                    };

                    var token = jwt.sign(payload, config.jwtsecret, {
                        expiresIn: 60*60*24
                    });

                    res.json({
                        success: true,
                        title: 'LoginSuccessful',
                        message: 'Login successful, token created.',
                        token: token,
                        username: users.username
                    });
                } else {
                    res.json({
                        success: false,
                        title: 'WrongPassword',
                        message: 'The provided password does not match.'
                    });
                }
            }
        });
    }
});


module.exports = router;
