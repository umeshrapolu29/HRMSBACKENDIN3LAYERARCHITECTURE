var express=require('express');
 var route=express.Router();
 var userservice=require('../services/userservice')
 var multer=require('multer');
 var storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/images')
    },
    filename: function (req, file, cb) {
        var file=file.originalname
        console.log(file+' file')
       cb(null,file )
     }
  })
  var upload = multer({ storage: storage })
 
 console.log(' in controller')

 route.post('/upload',upload.single('file'),(req,res)=>{
  
  return userservice.uploaddata(req,res);

})
 module.exports=route;