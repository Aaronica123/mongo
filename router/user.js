const {Router} = require('express');
const { userRegistration } = require('../controller/user.js');

const routes = Router();
routes.post('/register', userRegistration);

module.exports = routes;