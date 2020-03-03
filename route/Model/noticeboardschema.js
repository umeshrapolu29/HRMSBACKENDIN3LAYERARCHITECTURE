var mongoose=require('mongoose');
var noticeboardschema=mongoose.Schema;

var noticeboardschema=noticeboardschema({
    date:{type:String},
    title:{type:String},
    description:{type:String},
    file:{type:String},
    rig:{type:String}
    
})
module.exports=mongoose.model('noticeboardschema',noticeboardschema)