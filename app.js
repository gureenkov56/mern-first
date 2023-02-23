const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const useRoute = require('./route');

const PORT = config.get('port') || 3030;

/***** 
 * create server by express
*/
const server = express();

// по дефолту express получает body в post запросах в виде стримов
// здесь middleware преобразующий в json
server.use(express.json({ extended: true }))

useRoute(server);

server.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))


/*****
 * connect to Mongo DB
*/
// const mongooseConnectSettings = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// }

// const connectMongoURL = config.get('connectMongoURL');

// mongoose.set('strictQuery', false);

// mongoose.connect(connectMongoURL, mongooseConnectSettings)
//     .then(() => {
//         console.log('Mongo DB has been success connected');
//     })
//     .catch(error => {
//         console.error('Connection to Mongo DB return ERROR');
//         console.error(error);
//         process.exit(1);
//     })



