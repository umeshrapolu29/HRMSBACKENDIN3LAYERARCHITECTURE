var mongoose=require('mongoose');
var adminschema=mongoose.Schema;

var adminschema=adminschema({
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String},
    password:{type:String}
    
})
module.exports=mongoose.model('adminschema',adminschema)