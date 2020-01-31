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
      console.log(lastname,firstname+"at service")
      userRepo.upload({firstname:firstname},{lastname:lastname},(err,data)=>{
          res.json({
              "msg":"uploaded Successfull",
              "data":data
          })
      })



  })

  