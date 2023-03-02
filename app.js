const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const mainRoute = require('./routes/mainRoute');
const userRoutes = require('./routes/User');


const PORT = config.get('port') || 3030;

/***** 
 * create server by express
*/
const server = express();

// по дефолту express получает body в post запросах в виде стримов
// здесь middleware преобразующий в json
server.use(express.json({ extended: true }))

server.use('/api', mainRoute);
server.use('/api', userRoutes);


// add routes
// useRoute(server); 
// authRoutes(server);



/*****
 * connect to Mongo DB
*/
const mongooseConnectSettings = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const connectMongoURL = config.get('connectMongoURL');

mongoose.set('strictQuery', false);

mongoose.connect(connectMongoURL, mongooseConnectSettings)
    .then(() => {
        console.log('Mongo DB has been success connected');
        server.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))
    })
    .catch(error => {
        console.error('Connection to Mongo DB return ERROR');
        console.error(error);
        process.exit(1);
    })



