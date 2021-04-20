const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const db = require('./application/config/database');
//const authentication = require('./application/auth');
const multer = require('multer');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const port = 8098;
const app = express();
const parserJson = express.json();

mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const database = mongoose.connection;
database ? console.log("Connected to database") : console.log("Error while connecting to database");

const filter = function(request, file, cb) {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/bmp") {
            cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(express.static(__dirname + "/public"));
app.use(multer({dest:"public/images", fileFilter: filter}).single("filedata"));

//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.use(cors());

app.use(parserJson);
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use((request, response, next) => {
    request.cookies.userId = undefined;
    if (request.cookies.token) {
        let clientToken = request.cookies.token;
        jwt.verify(clientToken, process.env.JWT_KEY, (err, payload) => {
            if (err) {
                console.log(err);
                next();
            } 

            request.cookies.userId = payload.userId;
            next();
        })
    } else {
    next();
    }
})

const privateRouter = require('./application/route/private_route');
const publicRouter = require('./application/route/public_route');

app.use('/', publicRouter);
//app.use(authentication.isAuthorized);
app.use('/', privateRouter);

app.listen(port, () => {
    console.log("Server is running on port " + port);
});