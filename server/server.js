const express =require("express");
const bodyParser = require("body-parser");

const mongoose = require("./db/mongoose.js")
const {Todo} = require("./models/todo.js");
const User = require("./models/user");



var app = express();

app.use(bodyParser.json());

app.post("/todos",(req,res) => 
{
    var newTodo = new Todo(
        {
            text:req.body.text
        });

    newTodo.save().then((doc) => 
{
    res.send(doc);
},(e) => 
{
    res.status(400).send(e);
});

});

app.get("/todos",(req,res) => 
{
    Todo.find().then((doc) => 
    {
        res.send({doc});
    },(e) => 
    {
        res.status(400).send(e);
    });

});



app.listen(3000,() => 
{
    console.log("Server is running on port 3000");
});