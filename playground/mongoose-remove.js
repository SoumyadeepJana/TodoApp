const {Mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");
const {MongoClient} = require("mongodb");

/*Todo.remove({}).then((doc) => 
{
    console.log(doc);  Deletes all the documents but doesn't return back any document
}) */

//Todo.findOneAndRemove({}).then((doc) => {console.log(doc);}) //deltes the first document matching and returns back the document

Todo.findByIdAndRemove("593a17f83c409a028086f897").then((doc) => 
{
    var newTodo = new Todo(
        {
            text:doc.text
        });

        newTodo.save().then((doc) => 
        {
            console.log("Saved succesfully");
        },(e) => {console.log("Error while saving file");});
}); //deltes the matched ddocument bu ID and returns back the document

