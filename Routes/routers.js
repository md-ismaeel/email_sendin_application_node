const express = require('express');
const emailController = require('../Controller/controller');
const { sendMail } = emailController;

const mailRoute = express.Router();

mailRoute.post('/api/sedMail', sendMail);

const routers = {
    mailRoute
}

module.exports = routers;

