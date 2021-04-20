//const router = require('express').Router();
const authController = require('../controller/authController');
const factsController = require('../controller/factsController');

const express = require('express');
//const auth = require('../controllers/auth');

const publicRouter = express.Router();

/*router.route('/facts')
    .get(factsController.getAllFacts);

router.route('/facts/:fact_id')
    .get(factsController.getById);

router.route('/registration').post(authController.registration);
router.route('/login').post(authController.login);*/

publicRouter.get('/facts', function(request, response) {
    factsController.getAllFacts(request, response);
});

publicRouter.get('/facts/:fact_id', function(request, response) {
    factsController.getById(request, response);
});

publicRouter.post('/registration', function(request, response) {
    console.log(request.body);
    authController.registration(request, response);
});

publicRouter.post('/login', function(request, response) {
    console.log(request.body);
    authController.login(request, response);
});

module.exports = publicRouter;