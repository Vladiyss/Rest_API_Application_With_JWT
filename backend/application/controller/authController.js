const User = require('../model/userModel');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const authentication = require('../config/authentication');

function authorize(response, user) {
	let token = jwt.sign({userId: user._id}, authentication.secretKey);
	let maxAge = 3600;
	response.setHeader('Set-Cookie', `token=${token}; max-age=${maxAge}; HttpOnly`);
    response.status(200).json({
	  user: user,
	});
}


exports.requireSignin = (request, response, next) => {
    if (request.cookies.userId) {
        next();
    } else {
        response.status(401).json({err: 'Need to log in!'});
    }
  }

exports.registration = (request, response) => {
    
    console.log(request.body);
    
    User.findOne({email: request.body.email}, function(err, user) {
        if (err) {
            console.log(err);
            response.status(500).json({err: 'Error'});
            return;
        }
        
        if (user) {
            response.status(401).json({err: 'User with this email already exists!'});
            return;
        }
        
        let newUser = new User();
        newUser.name = request.body.name;
        newUser.surname = request.body.surname;
        newUser.email = request.body.email;
        newUser.password = getPasswordHash(request.body.password);
        
        newUser.save(function(err) {
            if (err) {
                console.log(err);
                response.status(500).json({err: 'Error occured during saving registrated user!'});
            } else {
                authorize(response, newUser);
            }
        }); 
    });

    /*let user = new User();
    user.name = request.body.name;
    user.surname = request.body.surname;
    user.email = request.body.email;
    user.password = getPasswordHash(request.body.password);
    user.save((err) => {
        if (err) {
            if (err.code === 11000) {
                response.status(409).send({message: 'This e-mail already exists!'});
                return;
            }
            response.status(400).send(err);
            return
        }
        
        //let User = {name: user.name, surname: user.surname, email: user.email, id: user._id }; 
        response.status(200).send({
            //registratedUser: User,
            token: tokenGeneration(user)
        });

    })*/
};

exports.login = (request, response) => {
    User.findOne({email: request.body.email, password: getPasswordHash(request.body.password)}, (err, user) => {
        if (!user) {
            response.status(404).send({
                message: 'User was not found!'
            });
            return;
        }
        if (err) {
            response.send(err);
            return;
        }

        authorize(response, user);

        //let User = {name: user.name, surname: user.surname, email: user.email, id: user._id }; 
        //response.status(200).send({
            //signedInUser: User,
        //    token: tokenGeneration(user)
        //});
    })
};

/*let tokenGeneration = (user) => {
    return jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        surname: user.surname
    }, authentication.secretKey, {expiresIn: authentication.expires});
};*/

let getPasswordHash = (password) => {
    return md5(password);
};
