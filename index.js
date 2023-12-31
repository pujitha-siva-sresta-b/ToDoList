const express = require('express');
const path = require('path');
const PORT = 8084;
const app = express();
const mongoose = require('./config/mongoose');
const taskData = require('./models/todoSchema');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static('../todolist/public'));
app.use(express.urlencoded());

app.get('/',function(req,res){
    res.send("I am in Home Page");
});

app.post('/add-task',function(req,res){
    const todoData = new Promise((resolve,reject) => {
        taskData.create({
            task : req.body.task,
            category : req.body.category,
            date : req.body.date
        })
        .then(newData => {
            console.log("***New Data***",newData);
            resolve(newData);
        })
        .catch(err => {
            console.log("Error in creating data");
        });
    });
    todoData
    .then((newData) => {
        res.redirect('back');
    })
    .catch(err => {
        console.log("Error",err);
    });
});

app.get('/delete-task',function(req,res){
    const id = req.query;
    var count = Object.keys(id).length;
    var deletePromises = [];
    for(let i=0;i<count;i++){
        deletePromises.push(taskData.findByIdAndDelete(Object.keys(id)[i]));
    }
    Promise.all(deletePromises)
    .then(data => {
        console.log("Data Deleted");
         return res.redirect('back');
    })
    .catch(err => {
        console.log("Error in deleting details",err);
        return res.redirect('back');
    });
});

app.get('/details',function(req,res){
    const todo = taskData.find({}).exec();
    todo
    .then(data => {
        console.log(data);
        res.render('details',{data});
    })
    .catch(err => {
        console.log("Error in fetching data");
    })
});

app.listen(PORT,function(err){
    if(err)
        console.log("Error in running server");
    else
        console.log("Server is running on PORT: "+PORT);
});