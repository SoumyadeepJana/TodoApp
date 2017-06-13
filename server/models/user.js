 const mongoose = require("mongoose");
 const validator = require("validator");
 const jwt = require("jsonwebtoken");
 var _ = require("lodash");

 var UserSchema = new mongoose.Schema(
     {
          email:
            {
                type:String,
                trim:true,
                minlength:1,
                required:true,
                unique:true,
                validate:
                {
                    validator:validator.isEmail,
                    message:"{VALUE} is not a valid email"
                }
            },
            password:
            {
                type:String,
                required:true,
                minlength:8,
                trim:true
            },
            tokens:[{
                access:
                {
                    type:String,
                    required:true
                },
                token:
                {
                    type:String,
                    required:true
                }
            }]

     });

UserSchema.methods.toJSON = function()
{
    var user = this;
    var userObj = user.toObject();

    return _.pick(userObj,["email","_id"]);
}
 
 
UserSchema.methods.generateAuthToken = function()
{
    var user = this;
    var access = "auth";
    var token = jwt.sign({_id:user._id.toHexString(),access},"123abc");

    user.tokens.push({access,token});

     return user.save().then(() => 
    {
        return token;
    });

}

UserSchema.statics.findByToken = function(token)
{
    var User = this;
    var decoded;
    try
    {
            decoded = jwt.verify(token,"123abc");
    }
    catch(e)
    {
        return Promise.reject();

    }

     return User.findOne(
        {
            '_id':decoded._id,
            'tokens.token':token,
            'tokens.access':"auth"
        });
}

 var User = mongoose.model("User",UserSchema);
        

 module.exports.User = User;       