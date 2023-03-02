const express = require('express')
const router = express.Router()

const { body, validationResult, check } = require('express-validator');
const User = require('../models/User');
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
        return res.status(200).json({ message: 'Authorization is success' })
    } else {
        // create JWT token
        return res.status(400).json({ message: 'Wrong password' })
    }
}




// const loginAndPasswordValidation = [
//     check('login')
//         .isLength({ min: 3 }).withMessage('Login is too short')
//         .matches('[0-9]').withMessage('Login Must Contain a Number')
//         .escape(),
//     check('password')
//         .matches('[0-9]').withMessage('Password Must Contain a Number'),
// ]

// async function createUser(req, res) {
//     const errorsValidate = validationResult(req);

//     console.log('errors: ', errorsValidate.array())

//     // TODO: сделать для каждой ошибки свой вывод
//     if (!errorsValidate.isEmpty()) {
//         return res.status(400).json({ errors: errorsValidate.array() })
//     }

//     try {
//         let { login, password } = req.body;

//         // проверка есть ли в базе уже такой логин
//         const checkLogin = await User.findOne({ login });
//         if (checkLogin) {
//             return res.status(400).json({ errors: [{ msg: 'Такой login уже существует' }] })
//         } else {
//             // здесь где-то ошибка бросается в catch

//             bcrypt.hash(password, 10, function (err, hash) {
//                 User.insertMany([{ login, password: hash }]);
//             });

//             console.log('password', password);

//             return res.status(201).json({
//                 message: `Успех регистрации!`
//             })
//         }
//     } catch (e) {
//         return res.status(400).json({
//             e,
//             msg: 'ошибка регистрации!'
//         });
//     }


// }

// async function loginFunc(req, res) {
//     try {
//         const { login, password } = req.body;

//         const findLogin = await User.findOne({ login });
//         if (!findLogin) {
//             return res.status(400).json({ errors: [{ msg: 'Login не зарегистрирован' }] })
//         }

//         const match = await bcrypt.compare(password, findLogin.password);

//         if (match) {
//             const token = jwt.sign(
//                 { userId: findLogin.id },
//                 config.get('JWTsecret'),
//                 { expiresIn: '1h' }
//             );

//             return res.status(200).json({ errors: [{ msg: 'Авторизация успешна' }] })
//         } else {
//             return res.status(400).json({ errors: [{ msg: 'Пароль неверный' }] })
//         }

//     } catch (error) {
//         console.log('error', error);
//     }

//     res.send(`Login post end`)
// }