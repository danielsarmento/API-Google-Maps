const routes = require('express').Router();
const distanciaController = require('../controllers/distanciaController');

routes.post('/distancia', distanciaController.distancia);

module.exports = routes;