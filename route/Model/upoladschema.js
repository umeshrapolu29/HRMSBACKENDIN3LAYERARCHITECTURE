var  mongoose=require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var uploadschema=mongoose.Schema;
console.log("schema");

var uploadschema=uploadschema({
    
    
       
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String},
    password:{type:String},
    phonenumber:{type:String},
    file:{type:String},
    DOJ:{type:String},
    DOB:{type:String},
    gender:{type:String},
    fullid:{type:String},
    
   
      
})
uploadschema.plugin(uniqueValidator);
module.exports=mongoose.model('uploadschema',uploadschema) 