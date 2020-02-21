var express=require('express');
var userRepo=require('../repositeries/userRepo');
var mongoose=require('mongoose');
var app=express();
var db=require('../Database/db');
var url=db.url
var app = express();
var multer=require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads/images')
    },
    filename: function (req, file, cb) {
       var file=file.originalname
       
      cb(null,file )
    }
  })
  var appData={
    "error":1,
    "Status":""
}
 var string='';
 var sendmail="";

 //var id=1;
   
  var upload = multer({ storage: storage })

  module.exports.uploaddata=((req,res)=>{
      var firstname=req.body.firstname;
      var lastname=req.body.lastname;
      var email=req.body.email;
       var password=req.body.password;
        var file= 'http://localhost:3002/images/'+ req.file.originalname;
        // var img2=req.body.imageproduct;
        var DOJ=req.body.DOJ;
        var phonenumber=req.body.phonenumber;
        var gender=req.body.gender;
        var DOB=req.body.DOB;   

      console.log(lastname,firstname+"at service")
      userRepo.upload({firstname:firstname},{lastname:lastname},{email:email},{password:password},{file:file},{DOJ:DOJ},{phonenumber:phonenumber},{gender:gender},{DOB:DOB},(err,data)=>{
          res.json({
              "msg":"uploaded Successfull",
              "data":data
          })
      })



  })

  