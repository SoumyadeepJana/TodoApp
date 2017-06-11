const express =require("express");
const bodyParser = require("body-parser");

const mongoose = require("./db/mongoose.js")
const {Todo} = require("./models/todo.js");
const {User} = require("./models/user");



var app = express();

var port =process.env.PORT || 3000;

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

/*app.get("/todos/:id",(req,res) => 
{
    var id = req.params.id;
    
    Todo.findById(id).then((doc) => 
    {
        if(!doc)
            res.status(404).send();
        res.send({doc});
        
    },(e) => 
    {
        res.status(400).send();
    });
});*/

app.get("/todos/:todo",(req,res) => 
{
    text = req.params.todo;

    Todo.findOne({text:text.toLowerCase()}).then((doc) => 
    {
        if(!doc)
          res.status(404).send();
        res.send(doc);
    },(e) => 
    {
        res.status(400).send();
    });
});

app.delete("/todos/:id",(req,res) => 
{
    id = req.params.id;

    Todo.findByIdAndRemove(id).then((doc) => 
    {
        if(!doc)
           res.status(404).send();
        res.status(200).send(doc);
    },(e) => {res.status(400).send();});
});



app.listen(port,() => 
{
    console.log(`Server is up and running on port ${port}`);
});

