var mongoose=require('mongoose');
var holidayschema=mongoose.Schema;

var holidayschema=holidayschema({
    date:{type:String},
    reason:{type:String},
    holidaytype:{type:String},
    dayofweek:{type:String}
    
})
module.exports=mongoose.model('holidayschema',holidayschema)