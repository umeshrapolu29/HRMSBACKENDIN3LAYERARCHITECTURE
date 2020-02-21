var  mongoose=require('mongoose');

var uploadschema=mongoose.Schema;
console.log("schema");

var uploadschema=uploadschema({
    
    
       
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String},
    password:{type:String},
    phone:{type:String},
    file:{type:String},
    DOJ:{type:String},
    DOB:{type:String},
    gender:{type:String}
    
   
      
})
module.exports=mongoose.model('uploadschema',uploadschema) 