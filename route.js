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
    const errorsValidate = validationResult(req);

    console.log('errors: ', errorsValidate.array())

    // TODO: сделать для каждой ошибки свой вывод
    if (!errorsValidate.isEmpty()) {
        return res.status(400).json({errors: errorsValidate.array()})
    }

    try {
        const { login, password } = req.body;

        

        // проверка есть ли в базе уже такой логин
        const checkLogin = await User.findOne({ login });
        if (checkLogin) {
            return res.status(400).json({ errors: [{msg: 'Такой login уже существует'}] })
        } else {
            User.insertMany([
                {
                    login,
                    password,
                    posts: null
                }
            ])
        }

        return res.status(200).json({
            message: `Успех регистрации!`
        })

    } catch (e) {        
        return res.status(400).json({ 
            e,
            msg: 'ошибка регистрации!' 
        });
    }
    

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