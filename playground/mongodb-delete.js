const {MongoClient,ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db) => 
{
    if(err)
       return console.log(`Error while conncting to Mongo server ${err}`);

    //deleteMany
   /* db.collection("Todo").deleteMany({text:"eat lunch"}).then((result) =>
     
     {
         console.log(result);
     });*/

    //deleteOne


    //findOneAndDelete
    db.collection("Todo").findOneAndDelete({completed:true}).then((result) => 
    {
        console.log(result);
    });
});