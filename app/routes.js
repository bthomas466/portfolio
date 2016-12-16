var express = require('express');
//grab models
var Bear = require('./models/bear');
var Project = require('./models/project');

//ROUTES FOR OUR API ===============================================
//get instance of express router
var router = express.Router();

//middleware to use for all requests
router.use(function(req, res, next) {
    //do logging
    console.log('Something is happening.');
    next(); //make sure we go to the next route and not stop here
});

//test route to make sure everything is working
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

//on routes that end in /projects
//--------------------------------------
router.route('/projects')
    .post(function(req, res) {
        var project = new Project();  //Create a new instane of the project model
        project.name = req.body.name; //set the project name (comes from the request)

        //save the project and check for errors
        project.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Project created!' });
        });
    })
    //get all the projects (accessed at GET)
    .get(function(req,res) {
        Project.find(function(err, projects) {
            if(err) {
                res.send(err);
            }
            res.json(projects);
        });
    });
//on routes that end in /projects/:project_id
//------------------------------------------------
router.route('/projects/:project_id')
    //get the project with that id (accessed at GET)
    .get(function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if(err) {
                res.send(err);
            }
            res.json(project);
        });
    })
    //update the project with this id(accessed at PUT)
    .put(function(req, res) {
        //use our project model to find the project we want
        Project.findById(req.params.project_id, function(err, project) {
            if(err) {
                res.send(err);
            }
            project.name = req.body.name; //update the project info
            project.role = req.body.role; // update the project role
            project.tech = req.body.tech; //update the project tech
            project.description = req.body.description; //update the project description
            project.img = req.body.img //get img src for project img

            //save the bear
            project.save(function(err) {
                if(err) {
                    res.send(err);
                }
                res.json({ message: 'Project updated!' });
            });
        });
    })
    //delete the project with this id (accessed at DELETE)
    .delete(function(req, res) {
        Project.remove({
            _id: req.params.project_id
        }, function(err, project) {
            if(err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted' });
        });
    });


//on routes that end in /bears
//--------------------------------------
router.route('/bears')
    .post(function(req, res) {
        var bear = new Bear();  //Create a new instane of the bear model
        bear.name = req.body.name; //set the bears name (comes from the request)

        //save the bear and check for errors
        bear.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Bear created!' });
        });
    })
    //get all the bears (accessed at GET)
    .get(function(req,res) {
        Bear.find(function(err, bears) {
            if(err) {
                res.send(err);
            }
            res.json(bears);
        });
    });
//on routes that end in /bears/:bear_id
//------------------------------------------------
router.route('/bears/:bear_id')
    //get the bear with that id (accessed at GET)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if(err) {
                res.send(err);
            }
            res.json(bear);
        });
    })
    //update the bear with this id(accessed at PUT)
    .put(function(req, res) {
        //use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {
            if(err) {
                res.send(err);
            }
            bear.nam = req.body.name; //update the bears info

            //save the bear
            bear.save(function(err) {
                if(err) {
                    res.send(err);
                }
                res.json({ message: 'Bear updated!' });
            });
        });
    })
    //delete the bear with this id (accessed at DELETE)
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if(err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router
