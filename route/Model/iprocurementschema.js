var mongoose=require('mongoose');
var iprocurementschema=mongoose.Schema;

var iprocurementschema=iprocurementschema({
    item:{type:String},
    description:{type:String},
    amount:{type:String},
    file:{type:String},
    status:{type:String},
    astatus:{type:String},
    email:{type:String},
    employeename:{type:String},
    TID:{type:String}
})
module.exports=mongoose.model('iprocurementschema',iprocurementschema)
