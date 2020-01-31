var  mongoose=require('mongoose');

var uploadschema=mongoose.Schema;
console.log("schema");

var uploadschema=uploadschema({
    
    
       
    firstname:{type:String},
    lastname:{type:String},
   
      
})
module.exports=mongoose.model('uploadschema',uploadschema) 