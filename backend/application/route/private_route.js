//const router = require('express').Router();
const factsController = require('../controller/factsController');

const express = require('express');
//const post = require('../controllers/post');
const {requireSignin} = require('../controller/authController');

const privateRouter = express.Router();

/*router.route('/facts')
    .post(factsController.new);

router.route('/facts/:fact_id')
    .put(factsController.update)
    .delete(factsController.delete);
*/

privateRouter.post('/facts', requireSignin, factsController.new);
privateRouter.put('/facts/:fact_id', requireSignin, factsController.update);
privateRouter.delete('/facts/:fact_id', requireSignin, factsController.delete);

module.exports = privateRouter;
