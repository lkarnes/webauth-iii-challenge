// const session = require('express-session');
// const knexSessionStore = require('connect-session-knex')(session);

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const apiRouter = require('./api/api-router');

// const sessionOptions = {
//     name: 'thecookie',
//     secret: 'theearthisflat',
//     cookie: {
//         maxAge: 1000 * 60 * 60,
//         secure: false,
//         httpOnly: true,
//     },
//     resave: false,
//     saveUninitialized: false,

//     store: new knexSessionStore({
//     knex: require('./dbConfig.js'),
//     tablename: 'sessions',
//     sidfieldname: 'sid',
//     createtable: true,
//     clearInterval: 1000 * 60 * 60
//   })
// }

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

// server.use(session(sessionOptions));

server.get('/', (req,res) => {
    res.status(200).json({message: "Welcome Home!!"})
})

server.use('/api', apiRouter);

module.exports = server;