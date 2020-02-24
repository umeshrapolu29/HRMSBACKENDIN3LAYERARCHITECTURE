var mongoose=require('mongoose');
var leaverequestschema=mongoose.Schema;

var leaverequestschema=leaverequestschema({
    reason:{type:String},
    reqtype:{type:String},
    requestto:{type:String},
    status:{type:String},
    fromdate:{type:String},
    todate:{type:String}
})
module.exports=mongoose.model('leaverequestschema',leaverequestschema)

