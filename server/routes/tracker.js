let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect with trackerModel

let Tracker = require('../models/tracker');

/* Read Operation 
Get route for tracker list */
router.get('/',(req,res,next)=>{
    Tracker.find((err,WorkoutTracker)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('tracker/list',{
                title:'Trackerlist', 
                Trackerlist: WorkoutTracker
            })
        }
    });
});


/* Add Operation*/
/* get route for displaying the Add page -- create operation */
router.get('/add',(req,res,next)=> {
    res.render('tracker/add',{title:'Add Workout'})
});
/* post route for processing the Add page -- create operation */
router.post('/add',(req,res,next)=> {
    let newWorkout = Tracker ({
        "WorkoutName":req.body.WorkoutName,
        "Sets":req.body.Sets,
        "Reps":req.body.Reps,
        "Weight":req.body.Weight
    });
    Tracker.create(newWorkout,(err,Tracker) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
          res.redirect('/w-track/');
        }
    });

});


/* Edit Operation*/
/* get route for displaying the Edit operation -- update operation */
router.get('/edit/:id',(req,res,next)=> {
    let id = req.params.id;
    Tracker.findById(id,(err,trackerToEdit) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('tracker/edit',{title:'Edit Workout', WorkoutTracker:trackerToEdit});
        }
    });
});
/* post route for processing the edit operation -- update operation */
router.post('/edit/:id',(req,res,next)=> {
    let id=req.params.id;
    let updateWorkout = Tracker ({
        "_id":id,
        "WorkoutName":req.body.WorkoutName,
        "Sets":req.body.Sets,
        "Reps":req.body.Reps,
        "Weight":req.body.Weight
    });
    Tracker.updateOne({_id:id},updateWorkout,(err) => 
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/w-track/');
        }
    });
});


/* Delete Operation*/
/* get to perform Delete operation -- delete operation */
router.get('/delete/:id',(req,res,next)=>{
    let id=req.params.id;
    Tracker.deleteOne({_id:id},(err)=>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/w-track/')
        }
    });
});

module.exports=router;