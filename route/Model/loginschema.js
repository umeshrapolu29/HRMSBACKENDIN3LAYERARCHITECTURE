var mongoose=require('mongoose');
 var loginschema=mongoose.Schema;
  var loginschema=loginschema({
      email:{type:String},
      password:{type:String},
  })
  module.exports=mongoose.model('loginschema',loginschema);

