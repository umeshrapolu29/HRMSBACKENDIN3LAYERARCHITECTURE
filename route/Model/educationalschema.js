var mongoose=require('mongoose');
var educationalchema=mongoose.Schema;

var educationalchema=educationalchema({
    empname:{type:String},
    tenth :{type:String},
    intermediate:{type:String},
    degree:{type:String},
    pg:{type:String},
    rig:{type:String},
   
    
})
module.exports=mongoose.model('educationalchema',educationalchema)