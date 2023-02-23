const { body, validationResult, check } = require('express-validator');
const User = require('./models/User');


module.exports = function (server) {

    server.get('/', (req, res) => {
        res.send('This is /')
    })

    server.get('/login', function (req, res) {
        res.send('Login route')
    });

    server.get('/api/test', function (req, res) {
        res.json({ message: 'Api test success' })
    });

    server.post(
        '/api/login',
        loginFunc
    )

    server.post(
        '/api/createuser',
        loginAndPasswordValidation,
        createUser
    )

    //other routes..
}

const loginAndPasswordValidation = [
    check('login')
        .isLength({ min: 3 }).withMessage('Login is too short')
        .matches('[0-9]').withMessage('Login Must Contain a Number')
        .escape(),
    check('password')
        .matches('[0-9]').withMessage('Password Must Contain a Number'),
]

async function createUser(req, res) {
    const errors = validationResult(req);

    console.log('errors: ', errors.array())

    // try {
    //     const { login, password } = req.body;


    //     // проверка есть ли в базе уже такой логин
    //     const checkLogin = await User.findOne({ login });

    //     if (checkLogin) {
    //         return res.status(400).json({ message: 'Такой login уже существует' })
    //     }
    // } catch (error) {

    // }
    return res.status(200).json({
        message: `body ${req.body.login}`
    })

    res.send(`Create user post end`)
}

async function loginFunc(req, res) {
    try {
        const { login, password } = req.body;

        console.log('login', login);
        console.log('password', password);


    } catch (error) {

    }

    res.send(`Login post end`)
}