const express = require('express')
const router = express.Router()

const { body, validationResult, check } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');

const validate = [
    body('login').isLength({ min: 3 }).withMessage('Login have to be longer 5 symbols'),
    body('password').isLength({ min: 3 }).withMessage('Password have to be longer 5 symbols'),
]

// get all users
router.get('/users', getAllUsers)
// reg new user
router.post('/reg', ...validate, createUser)
// login
router.post('/login', loginUser)
// profile (inly for logined)
router.get('/profile', middlewareCheckToken, profile)

module.exports = router

async function getAllUsers(req, res) {
    const allUsers = await User.find();
    return res.status(200).json(allUsers)
}

async function createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let isExistLogin = User.findOne({ login: req.body.login });
    if (isExistLogin) {
        return res.status(400).json({ message: 'Login exist' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    const newUser = {
        login: req.body.login,
        password: hashedPassword,
    }

    const success = await User.create(newUser, (err) => {
        if (err) return res.status(400).json({ message: 'User create error', err });
    })

    return res.status(201).json({
        message: success,
        login: req.body.login,
        password: hashedPassword,
    });
}

async function loginUser(req, res) {
    const findLogin = await User.findOne({ login: req.body.login });
    if (!findLogin) {
        return res.status(400).json({ message: 'Login is not exist' })
    }

    let comparePassword = await bcrypt.compare(req.body.password, findLogin.password)
    if (comparePassword) {
        const token = jwt.sign({userid: findLogin._id}, config.get('JWTsecret'))
        return res.status(200).json({ 
            message: 'Authorization is success',
            token,
        })
    } else {
        // create JWT token
        return res.status(400).json({ message: 'Wrong password' })
    }
}

function profile(req, res) {
    jwt.verify(req.token, config.get("JWTsecret"), (err, data) => {
        if (err) {
            res.status(403).json({message: 'JWT verify error'});
        } else {
            res.status(200).json({
                message: 'JWT verify success',
                data,
            })
        }
    });
}

function middlewareCheckToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== undefined) {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(403).json({message: 'Only for authed users'})
    }
}
