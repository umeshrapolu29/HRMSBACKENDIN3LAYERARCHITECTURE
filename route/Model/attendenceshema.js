var mongoose=require('mongoose');
var attendenceschema=mongoose.Schema;

var attendenceschema=attendenceschema({
    date:{type:String},
    email:{type:String},
    status:{type:String},

    
})
module.exports=mongoose.model('attendenceschema',attendenceschema)