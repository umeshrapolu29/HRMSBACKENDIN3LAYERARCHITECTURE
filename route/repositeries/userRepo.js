var Schema=require('../Model/schema')
var uploadschema=require('../Model/upoladschema')

module.exports.upload=(firstname,lastname, email,password,file,DOJ,phonenumber,gender,DOB,callback)=>{
    console.log(firstname,lastname+"at repo")
    
    var reg=new uploadschema({
        firstname:firstname.firstname,
        lastname:lastname.lastname,
        email:email.email,
        password:password.password,
        file:file.file,
        DOJ:DOJ.DOJ,
        phonenumber:phonenumber.phonenumber,
        gender:gender.gender,
        DOB:DOB.DOB

      
     
   
     

  
    })
    reg.save()
    .then(result=>{
        callback(null,result)
    }).catch(error=>{
        callback(null,error)
    })

}