const mongoose = require('mongoose');
//Creating Schema for Tasks
const taskSchema = new mongoose.Schema({
    task : {
        type : String, required : true
    },
    category : {
        type : String, required : true
    },
    date : {
        type : String
    }
});
//Creating Model
const taskData = mongoose.model('taskData',taskSchema);
//Exporting the Schema
module.exports = taskData;

