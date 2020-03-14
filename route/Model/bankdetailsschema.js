var mongoose=require('mongoose');
var bankdetailsschema=mongoose.Schema;

var bankdetailsschema=bankdetailsschema({
    empname:{type:String},

    Accountholdername :{type:String},
    Accountnumber:{type:String},
    Bankname:{type:String},
    pannumber:{type:String},
    branch:{type:String},
    IFSCcode:{type:String},
    rig:{type:String},
   

   
    
})
module.exports=mongoose.model('bankdetailsschema',bankdetailsschema)