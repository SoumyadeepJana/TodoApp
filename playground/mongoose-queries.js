var mongoose = require("./../server/db/mongoose");
var {Todo} = require("./../server/models/todo");
var {User} = require("./../server/models/user");

var {ObjectID} = require("mongodb")

//var id = "693a466dfdd46506ec0a400b";  todo id

var t ="Meeting with principal";  //user id

/*if(!ObjectID.isValid(id))
{
    return console.log("Invalid id");
}*/

Todo.findOne(
    {
        text:t.toLowerCase()
    }).then((res) => 
    {
        /*if(!res)
        {
            return console.log("id not found");
        }*/
        console.log(res);
    },(e) => {console.log("id invalid")}); 

 /*   User.findById(id).then((res) => 
    {
        if(!res)
        {
            return console.log("User not found");
        }

        console.log("User",res);
    },(e) => {return console.log("Invalid id")}); */