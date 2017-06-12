 const mongoose = require("mongoose");
 const validator = require("validator");
 const jwt = require("jsonwebtoken");

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
            token:[{
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
 
 
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

 var User = mongoose.model("User",UserSchema);
        

 module.exports.User = User;       