const Fact = require('../model/factsModel');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getAllFacts = (request, response) => {
    console.log('Try to get facts');
    /*if (!request.cookies?.userId) {
        response.status(401).send("Need to log in");
	    return;
    }*/
    
    Fact.find().sort({[request.query.sort]: request.query.order}).exec((err, facts) => {
        /*if (err) {
            response.json({
                status: "error",
                message: err,
            });
        }
        response.json({
            status: "success",
            message: "Facts was successfully retrieved",
            payload: facts
        });*/
        if (err) {
            console.log(err);
	        response.status(500).json({err: 'Error occured during facts retrieving!'});
        }
        else {
            let factsToSend = facts.map( fact => {
                return {
                    factId: fact._id,
                    title: fact.title,
                    content: fact.content,
                    photo: 'images/' + fact.image,
                    likes: fact.likes.length,
                  }
            })
            console.log(factsToSend);
            response.json({payload: factsToSend});
        }
    })
};

exports.new = (request, response) => {
    {
        console.log('Try to create fact');
        if (request.cookies === undefined) {
            console.log('No cookies');
            response.status(401).json({err: 'Need to log in'});
            return;
        }

        let userId = request.cookies.userId;
        if (userId === undefined) {
          console.log('No userId cookie');  
          response.status(401).json({err: 'Need to log in'});
          return;
        }

        if (request.file == undefined || request.file.filename === undefined) {
            response.status(400).json({err: 'Please, choose the image!'});
            return;
        }

        let fact = new Fact( {
            title: request.body.title,
            content: request.body.content,
            image: request.file.filename
        })

        fact.save(function(err) {
            if (err) {
                console.log(err);
                response.status(500).json({err: 'Error occur during fact saving!'});
            } else {
                //response.status(200).json({payload: fact});
                response.json({payload: fact});
            }
        });

        //let fact = new Fact();
        //fact.title = request.body.title;
        //fact.content = request.body.content;
        //fact.image = request.body.imageName;
        //fact.image = request.body.file.filename;
        //fact.image = request.body.filedata;
        //fact.image = request.files.filedata;
        //console.log(request.body.content);
        //console.log(request.body.file.filename);
        //console.log(request.body.filedata);
        //console.log(request.files.filedata);
        //console.log(request.body.title);
        /*fact.save((err) => {
            response.status(200).json({
                message: 'New fact was created!',
                payload: fact
            });
        });*/
    }
};

exports.getById = (request, response) => {
    console.log('Try to get fact by id');
    if (!request.cookies?.userId) {
        response.status(401).send("Need to log in");
	    return;
    }
    
    let id = request.params.fact_id;
    if (!ObjectId.isValid(id)) {
        //response.status(400).send({
        //    message: 'Bad id!'
        //});
        response.status(400).send("Bad id!");
        return;
    }
    Fact.findById(id, (err, fact) => {
        if (err) {
            console.log(err);
	        response.status(500).json({err: 'Error occur during getting fact by id!'});
            //response.send(err);
        } else {
            let factToSend = {
                factId: fact._id,
                title: fact.title,
                content: fact.content,
                photo: 'images/' + fact.image,
                likes: fact.likes.length,
            }
            
            console.log(factToSend);
            response.json({payload: factToSend});
        }
            
        /*response.status(200).send({
            message: 'Fact details.',
            payload: fact
        });*/
    });
};

exports.update = (request, response) => {
    console.log('Try to update fact');
    
    console.log(request);
    
    if (request.cookies === undefined || request.cookies.userId === undefined) {
        response.send("Need to log in");
	    return;
    }
  
    console.log(request.body);
    
    let id = request.params.fact_id;
    if (!ObjectId.isValid(id)) {
        //response.status(400).send({
        //    message: 'Bad id!'
        //});
        //return;
        response.status(400).send("Bad id!");
        return;
    }

    Fact.findById(id, (err, fact) => {
        if (err) {
            console.log(err);
	        response.status(500).json({err: 'Error occur during getting fact by id for update!'});
            //response.send(err);
        }
        fact.title = request.body.title ? request.body.title : fact.title;
        fact.content = request.body.content ? request.body.content : fact.content;

        let popFlag = false;
	    for (let i = 0; i < fact.likes.length; i++) {
	        /*if (fact.likes[i] == request.body.userID) {
	            fact.likes.pop(request.body.userID);
		        popFlag = true;
	        }*/
            if (fact.likes[i] == request.cookies.userId) {
	            fact.likes.pop(request.cookies.userId);
		        popFlag = true;
	        }
	    }
	
	    if (!popFlag) {
	        fact.likes.push(request.cookies.userId);
            //fact.likes.push(request.body.userID);
	    }
	    console.log(fact.likes.length);

        fact.save((err) => {
            if (err) {
                console.log(err);
	            response.status(500).json({err: 'Error occur during saving updated fact!'});
                //response.status(400).send(err);
            }
            /*response.status(200).send({
                message: 'Fact info was updated',
                payload: fact
            });*/
            console.log(fact);
            response.json({payload: fact});
        });
    });
};


exports.delete = function (request, response) {
  
    if (!request.cookies || !request.cookies.userId) {
        response.status(401).json({err: 'Need to log in'});
    }
    let id = request.params.fact_id;
    console.log(id);
    
    
    if (!ObjectId.isValid(id)) {
        //response.status(400).send({
        //    message: 'Bad id!'
        //});
        //return;

        response.status(400).send("Bad id!");
        return;
    }

    Fact.deleteOne({_id: id}, (err, fact) => {
        if (err) {
            //response.send(err);
            console.log(err);
			response.status(500).json();
			return;
        }
            
        console.log(fact);
        response.status(204).send({
            status: "Success",
            message: 'Fact was deleted'
        });
    });
};
