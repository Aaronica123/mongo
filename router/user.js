const {Router} = require('express');
const { userRegistration, getAllUsers } = require('../controller/user.js');

const routes = Router();
routes.post('/register', userRegistration);
routes.get('/', getAllUsers);

module.exports = routes;