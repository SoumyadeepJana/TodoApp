const {MongoClient,ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err,db) => 
{
    if(err)
       return console.log("Unabble to connect to MongoDB server");

    console.log("Connected to MongoDB server");

    db.collection("Todo").find().toArray().then((docs) => 
    {
        console.log("Todos");
       // docs.forEach((data)=> {console.log(data)},(err)=>{console.log("Error")})
        console.log(docs);
    },(err) => 
    {
        console.log(`Unable to fetch data from database ${err}`);

    });

    db.collection("Todo").find().count().then((counts) => 
    {
        console.log(`Todo counts : ${counts}`);
    },(err) => 
    {
        console.log("Unable to fetch document");
    }); 

   /* db.collection("Users").find({name:"Soumyadeep Jana"}).forEach((data) => 
    {
        console.log(data);
    });*/
    
    
     
    db.close();
});