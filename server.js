const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

// Controllers
const testJWTCtrl = require('./controllers/test-jwt');
const authCtrl = require('./controllers/authCtrl');

mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// ROUTES

app.post('/auth/sign-up', authCtrl.signup);
app.post('/auth/sign-in', authCtrl.signin);

// DELETE TEST ROUTES
app.get('/sign-token', testJWTCtrl.signToken);
app.post('/verify-token', testJWTCtrl.verifyToken);

app.listen(3000, () => {
  console.log('The express app is ready!');
});