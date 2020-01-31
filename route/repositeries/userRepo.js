var Schema=require('../Model/schema')
var uploadschema=require('../Model/upoladschema')

module.exports.upload=(firstname,lastname,callback)=>{
    console.log(firstname,lastname+"at repo")
    
    var reg=new uploadschema({
        firstname:firstname.firstname,
        lastname:lastname.lastname,
      
     
   
     

  
    })
    reg.save()
    .then(result=>{
        callback(null,result)
    }).catch(error=>{
        callback(null,error)
    })

}