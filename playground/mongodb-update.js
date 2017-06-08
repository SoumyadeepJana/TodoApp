const {MongoClient,ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db) => 
{
    if(err)
       return console.log("Unable to connnect to mongo server");

    console.log("Connection succesful to mongo server");

   /* db.collection("Todo").findOneAndUpdate(
        {
            _id:new ObjectID("593846a4117cb599959ca12e")
        },
        {$set:
            {
                completed:true
            }},
            {
                returnOriginal:false
                
            }).then( (result) => 
            {
                console.log(result);
            }); */

        db.collection("Users").findOneAndUpdate(
            {
                name:"Rohan"
            },
            {
                $set:{name:"Raj"},
                $inc:{age:5}
            
            },
            
            {
                returnOriginal:false
            }).then((result) => 
            {
                console.log(result);
            });

   db.close();
});