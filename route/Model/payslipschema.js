var mongoose=require('mongoose');
var payslipschema=mongoose.Schema;

var payslipschema=payslipschema({
    email:{type:String},
    file:{type:String},
    month:{type:String},
    year:{type:String}
    
})
module.exports=mongoose.model('payslipschema',payslipschema)