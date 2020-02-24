var express=require('express');
var userRepo=require('../repositeries/userRepo');
var mongoose=require('mongoose');
var app=express();
var db=require('../Database/db');
var nodemailer=require('nodemailer');
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
    var today = new Date();
    var year = today.getFullYear();
    var mon = today.getMonth() + 1;
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

      console.log(lastname,firstname,password,gender,file,DOJ,DOB,phonenumber+"at service")
      userRepo.upload({firstname:firstname},{lastname:lastname},{email:email},{password:password},{file:file},{DOJ:DOJ},{phonenumber:phonenumber},{gender:gender},{DOB:DOB},(err,data)=>{
          res.json({
              "msg":"uploaded Successfull",
              "data":data
          })
      })



  })
  module.exports.login=((req,res)=>{
    var email=req.body.email;
    var password=req.body.password;
    var pass;

    userRepo.login({email:email},(err,data)=>{
      pass=data.password
      console.log(pass);

      if(password==pass){

      res.json({
        "msg":"login successfull",
        "data":data
      })
    }
    else{
      res.json({
        "msg":"login failed",
        "data":data
      })
    }
    })
  }) 


  // get user data.......................

  module.exports.getuserdata=((req,res)=>{
     var email=req.body.email;

     userRepo.getuserdata({email:email},(err,data)=>{
       res.json({
         "msg":"details are Retrived",
         "data":data
       })
     })
  })
  module.exports.leaverequest=((req,res)=>{
    var reason=req.body.reason;
    var reqtype=req.body.reqtype;
    var requestto=req.body.requestto;
    var status="NOT YET APPROVED";
    var fromdate=req.body.fromdate;
    var todate=req.body.todate;
    console.log(reason,reqtype,requestto,fromdate,todate+"at service");
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sampathkumar0078@gmail.com',
        pass: '$@mp@th586'
      }
    });
    
    var mailOptions = {
      from: 'sampathkumar0078@gmail.com',
      to: 'umeshrapolu29@gmail.com',
      subject: 'Leave request from '+requestto,
      
      
      text: 'Dear manager'+('\n')+'Please grant me the '+reqtype+' leave for the reason of '+reason+' from the date '+fromdate+' to '+todate+'.'+('\n')+'Thanks and regards'+('\n')+requestto+'.'
      
  };
   // console.log(details.title,details.description+"notice details")
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent for Leave request: ' + info.response);
      }
    });



    userRepo.leaverequest({reason:reason},{reqtype:reqtype},{requestto:requestto},{status:status},{fromdate:fromdate},{todate:todate},(err,data)=>{
      res.json({
        "msg":"leave request data inserted",
        "data":data
      })
    })
  })
  module.exports.getleaveemployee=((req,res)=>{
    userRepo.getleaveemployee((err,data)=>{
      res.json({
        "msg":"Leave employee dateilas are trieved",
        "data":data
      })
    })
  })
  module.exports.leaveupdate=((req,res)=>{
    var status=req.body.status;
    var requestto=req.body.requestto
    console.log(requestto+"at service");
    userRepo.leaveupdate({requestto:requestto},{status:status},(err,data)=>{
      if(data){
      res.json({
        "msg":"leavestatus Update",
        "data":data
        

      })
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sampathkumar0078@gmail.com',
          pass: '$@mp@th586'
        }
      });
      
      var mailOptions = {
        from: 'sampathkumar0078@gmail.com',
        to: 'umeshrapolu29@gmail.com',
        subject: 'Leave status',
        
        
        text: 'Dear '+requestto+','+('\n')+'Your leave request has been '+status+'.'+('\n')+'Thanks and regards.'+('\n')+'Zyclyx'+'.'
        
    };
      //console.log(details.title,details.description+"notice details")
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent for update leave status: ' + info.response);
          res.send("success")
        }
      });


    }
    else{
      res.json({
        "msg":"Leavestatus not updated"
      })
    }
    })
  })
module.exports.leaveapproveddata=((req,res)=>{

  var requestto=req.body.requestto;
  var status="Approved";

  userRepo.leaveapproveddata({requestto:requestto},(err,data)=>{
    res.json({
      "msg":"getstatusdata",
      "data":data
    })
  })

})
module.exports.addholiday=((req,res)=>{
  var date=req.body.date;
  var reason=req.body.reason;
  var holidaytype=req.body.holidaytype;
  var dayofweek=req.body.dayofweek;
  console.log(date,reason,holidaytype,dayofweek+"at servive")

  userRepo.addholiday({date:date},{reason:reason},{holidaytype:holidaytype},{dayofweek:dayofweek},(err,data)=>{
    if(data){
      res.json({
        "msg":"addholiday data inserted",
        "data":data
      })
    }else{
      res.json({
        "msg":"addholiday data not updated",
        "data":data
      })
    }
  })

})
module.exports.viewholiday=((req,res)=>{
  var holidaytype=req.body.holidaytype;

  userRepo.viewholiday({holidaytype:holidaytype},(err,data)=>{
    if(data){
      res.json({
        "msg":"viewholiday data Retrived",
        "data":data
      })
    }
    else{
      res.json({
        "msg":"viewholiday  not data Retrived",
        "data":data
      })
    }

    
  })
})
module.exports.addnotice=((req,res)=>{
  var date=req.body.date;
  var title=req.body.title;
  var description=req.body.description;
  var file= 'http://localhost:3002/images/'+ req.file.originalname;
  userRepo.addnotice({date:date},{title:title},{description:description},{file:file},(err,data)=>{
    if(data){
      res.json({
        "msg":"addnotice data",
        "data":data
      })
    }
    else{
      res.json({
        "msg":"addnotice not inserted",
        "data":data
      })
    }
  })
})
module.exports.removenotice=((req,res)=>{
  var title=req.body.title;
  console.log(title+"at service")
  userRepo.removenotice({title:title},(err,data)=>{
    if(data){
      res.json({
        "msg":"noticedata deletd",
        "data":data
      })
    }
    else{
      res.json({
        "msg":"noticedata  not deletd",
        "data":err
      })
    }
  })
})
module.exports.viewnotice=((req,res)=>{
  userRepo.viewnotice({},(err,data)=>{
    if(data){
      res.json({
        "msg":"data retrived",
        "data":data
      })
    }
    else{
      res.json({
        "msg":"data  not retrived",
        "data":err
      })
    }

  }

  )
})

module.exports.addiprocurement=(req,res)=>{
  var item= req.body.item;
  var description=req.body.description;
  var amount=req.body.amount;
  var file= 'http://localhost:3002/images/'+ req.file.originalname;
  var status="false";
  var astatus="Not yet approved";
  var email=req.body.email;
  var employeename=req.body.employeename;
  console.log(item,description,amount,file,status,astatus,email,employeename+"at service")

  userRepo.addiprocuremnt({item:item},{description:description},{amount:amount},{file:file},{status:status},{astatus:astatus},{email:email},{employeename:employeename},(err,data)=>{
    if(data){
      res.json({
        "msg":"added Iprocumerent",
        "data":data
      })
    }
    else{
      res.json({
        "msg":"not Iprocumerent",
        "data":err
      })
    }
  })
}
module.exports.getusernamesiprocurement=((req,res)=>{
  var astatus="Not yet approved";
  userRepo.getusernamesiprocurement({astatus:astatus},(err,data)=>{
    if(data){
      res.json({
        "msg":"get details",
        "data":data
      })
    }
    else{
      res.json({
        "msg":"not getting",
        "data":err
      })
    }
  })
})

module.exports.updatestatusiprocuremnt=((req,res)=>{
  var TID=req.body.TID;
  var astatus=req.body.astatus;
  console.log(TID,astatus+"at service");

  userRepo.upadatestatusiprocurement({TID:TID},{astatus:astatus},(err,data)=>{
    if(data){
      res.json({
        "msg":"data retrived",
        "data":data
      })
    }
    else{
      res.json({
        "msg":"data not getting",
        "data":err
      })
    }
  })
})

  