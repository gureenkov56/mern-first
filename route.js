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

    //other routes..
}