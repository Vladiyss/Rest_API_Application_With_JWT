const jwt = require('jsonwebtoken');
const authentication = require('./config/authentication');

module.exports.isAuthorized = (request, response, next) => {
    let token = request.headers.authorization;
    console.log(token);

    if (!token) {
        response.sendStatus(403);
        return;
    }
    
    try {
        jwt.verify(token, authentication.secretKey);
        console.log("Verification success");
    } catch (e) {
        response.status(403).send({
            message: 'Bad token'
        });
        return;
    }
    return next();
};