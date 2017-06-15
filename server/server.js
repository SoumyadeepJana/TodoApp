const express =require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const mongoose = require("./db/mongoose.js")
const {Todo} = require("./models/todo.js");
const {User} = require("./models/user");
const {ObjectID} = require("mongodb");
const {authenticate} = require("./middleware/authenticate");



var app = express();

var port =process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/todos",authenticate,(req,res) => 
{
    
    var body = _.pick(req.body,["text"]);
    body._creator = req.user._id;
    console.log(body._creator);
    var newTodo = new Todo(body);

    newTodo.save().then((doc) => 
{
    res.send(doc);
},(e) => 
{
    res.status(400).send(e);
});

});

app.get("/todos",authenticate,(req,res) => 
{
    Todo.find({_creator:req.user._id}).then((doc) => 
    {
        res.send({doc});
    },(e) => 
    {
        res.status(400).send(e);
    });

});

app.get("/todos/:id",authenticate,(req,res) => 
{
    var id = req.params.id;
    
    Todo.findOne({_id:id,_creator:req.user_id}).then((doc) => 
    {
        if(!doc)
            res.status(404).send();
        res.send({doc});
        
    },(e) => 
    {
        res.status(400).send();
    });
});

/*app.get("/todos/:todo",(req,res) => 
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
});*/

app.delete("/todos/:id",authenticate,(req,res) => 
{
    id = req.params.id;

    Todo.findOneAndRemove({_id:id,_creator:req.user._id}).then((doc) => 
    {
        if(!doc)
           res.status(404).send();
        res.status(200).send({doc});
    },(e) => {res.status(400).send();});
});

app.patch("/todos/:id",authenticate,(req,res) => 
{
    var id = req.params.id;

    if(!ObjectID.isValid(id))
       res.status(404).send();

    var body = _.pick(req.body,["text","completed"]);

    if(_.isBoolean(body.completed) && body.completed )
    {
        body.completedAt = new Date().getTime();
        Todo.findByOneAndUpdate({_id:id,_creator:req.user._id},{$set:body},{new:true}).then((doc) => 
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

app.post("/users/login",(req,res) => 
{
    body = _.pick(req.body,["email","password"]);
    User.findByCredentials(body.email,body.password).then((user) => 
    {
        return user.generateAuthToken().then((token) => 
        {
            res.header("x-auth",token).send(user);
        });
    }).catch((e) => 
    {
        res.status(400).send();
    });
});

app.delete("/users/me/token",authenticate,(req,res) => 
{
    req.user.deleteToken(req.token).then(() => 
    {
        res.status(200).send();
    },(e) => 
    {
        res.status(404).send();
    })
});



app.listen(port,() => 
{
    console.log(`Server is up and running on port ${port}`);
});

