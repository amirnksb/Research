require('dotenv').config();
const winston = require('winston');
const error = require('./middleware/error')
const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');
const researchs = require('./routes/Research');
const users = require('./routes/User');
const login = require('./routes/login');
const express = require('express');
const app = express();

const files = new winston.transports.File({ filename: 'combined.log' });
winston.add(files);

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined')
    process.exit(1);
}

mongoose.connect('mongodb://0.0.0.0/Research')
    .then(() => console.log('connected to mongoDB...'))
    .catch(err => console.error('could not connect to mongodb', err))

app.use(express.json());
app.use('/api/researchs', researchs)
app.use('/api/users', users)
app.use('/api/login', login)

app.use(error);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));


