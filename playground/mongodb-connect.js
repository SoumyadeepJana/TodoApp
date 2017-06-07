const {MongoClient,ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db) => 
{
    if(err)
      return console.log("Unable to connect to MongoDB server");

    console.log("Succesfully connected to MongoDB server");

   /* db.collection("Todo").insertOne(
        {
            text:"Homework to do",
            completed:false
        },(err,result) => 
    {
         if(err)
           return conslole.log("Unable to insert data",err);
        
        console.log(JSON.stringify(result.ops,undefined,2));
    }); */

    db.collection("Users").insertOne(
        {
            name:"Soumyadeep Jana",
            age:19,
            location:"Murshidabad"
        },(err,result) => 
    {
        if(err)
           return console.log(`Unable to insert record ${err}`);

        console.log(result.ops[0]._id.getTimestamp());
    });

    db.close();
});