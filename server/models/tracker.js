let mongoose = require('mongoose');

//create tracker model
let trackerModel = mongoose.Schema({
    WorkoutName: String,
    Sets: Number,
    Reps: Number,
    Weight: Number
},
{
    collection: "WorkoutTracker"
}

)

module.exports = mongoose.model('WorkoutTracker',trackerModel);