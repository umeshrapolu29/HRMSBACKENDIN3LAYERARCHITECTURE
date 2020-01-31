var  mongoose=require('mongoose');

var Schema1=mongoose.Schema;
console.log("schema");

var Schema1=Schema1({
    
    
       
    firstname:{type:String},
    lastname:{type:String},
   
      
})
module.exports=mongoose.model('Schema1',Schema1) 