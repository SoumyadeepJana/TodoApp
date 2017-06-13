const express =require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const mongoose = require("./db/mongoose.js")
const {Todo} = require("./models/todo.js");
const {User} = require("./models/user");
const {ObjectID} = require("mongodb");
const {authenticate} = require("./middleware/authenticate");



var app = express();

var port =process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/todos",(req,res) => 
{
    
    var body = _.pick(req.body,["text"]);
    var newTodo = new Todo(body);

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
        res.status(200).send({doc});
    },(e) => {res.status(400).send();});
});

app.patch("/todos/:id",(req,res) => 
{
    var id = req.params.id;

    if(!ObjectID.isValid(id))
       res.status(404).send();

    var body = _.pick(req.body,["text","completed"]);

    if(_.isBoolean(body.completed) && body.completed )
    {
        body.completedAt = new Date().getTime();
        Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((doc) => 
        {
            res.status(200).send(doc);
        },(e) => {res.status(400).send();})
    }

    else{
        res.status(400).send();
    }
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.generateAuthToken().then((token) => 
  {
      res.header("x-auth",token).send(user);
  }).catch((e) => 
  {
      res.status(400).send();  
  });

});



app.get("/users/me",authenticate,(req,res) => 
{
    res.send(req.user);
});



app.listen(port,() => 
{
    console.log(`Server is up and running on port ${port}`);
});

