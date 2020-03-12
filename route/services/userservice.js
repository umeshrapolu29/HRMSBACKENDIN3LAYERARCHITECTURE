var express=require('express');
var userRepo=require('../repositeries/userRepo');
var mongoose=require('mongoose');
var app=express();
var db=require('../Database/db');
const dotenv=require('dotenv')
var randomstring=require('randomstring');
dotenv.config();
const user = process.env.USER;
const password = process.env.PASSWORD;
const fs = require('fs');
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
       if (req.file === undefined){
        var file= 'https://hrmsbackend.herokuapp.com/images/'+'logo-2.jpg';
       }
       else{
          var file= 'https://hrmsbackend.herokuapp.com/images/'+ req.file.originalname;

       }
        

        console.log();
        // var img2=req.body.imageproduct;
        var DOJ=req.body.DOJ;
        var phonenumber=req.body.phonenumber;
        var gender=req.body.gender;
        var DOB=req.body.DOB;   

      console.log(lastname,firstname,password,gender,file,DOJ,DOB,phonenumber+"at service")
      userRepo.upload({firstname:firstname},{lastname:lastname},{email:email},{password:password},{file:file},{DOJ:DOJ},{phonenumber:phonenumber},{gender:gender},{DOB:DOB},(err,data)=>{
        if(data){
        res.json({
              "msg":"uploaded Successfull",
              "data":data
          })
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user:'sandeep.reddy@zyclyx.com',
              pass: 'cweaaodfhejidcga'
            }
          });
          
          var mailOptions = {
            from: 'sampathkumar0078@gmail.com',
            to: 'umeshrapolu29@gmail.com',
            subject: ' Registration Process',
            
            
            text: 'Dear  '+firstname+','+('\n\n')+ 'Your succesfully register in HRMS portal.Please check below your username,password '+('\n\n')+'UserName:'+email+('\n')+'Password:'+password+('\n')+ 'Thanks and regards.'+('\n\n')+' HR Operations.'+('\n\n')+'Link:https://umeshrapolu29.github.io/hrms-employee/hrms-employee#/signin'
            
            
        };
         // console.log(details.title,details.description+"notice details")
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent for Leave request: ' + info.response);
            }
          });

        }else{
          res.json({
            "msg":"uploaded failed",
            "data":err
        })

        }
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
    var emailto1=req.body.emailto;
    var reason=req.body.reason;
    var reqtype=req.body.reqtype;
    var requestto=req.body.requestto;
    var status="NOT YET APPROVED";
    var fromdate=req.body.fromdate;
    var todate=req.body.todate;
    var name=req.body.name;
    console.log(user,password+"user password");
    console.log(reason,reqtype,requestto,fromdate,todate,emailto1,name+"at service");
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:'sandeep.reddy@zyclyx.com',
        pass: 'cweaaodfhejidcga'
      }
    });
    
    var mailOptions = {
      from: 'sampathkumar0078@gmail.com',
      to: 'umeshrapolu29@gmail.com',
      subject: 'Leave request from '+name,
      
      
      text: 'Dear  '+emailto1+','+('\n\n')+ 'Please grant me the '+reqtype+' leave for the reason of '+reason+' from the date '+fromdate+' to '+todate+'.'+('\n\n')+ 'Thanks and regards.'+('\n\n')+name+'.'
      
  };
   // console.log(details.title,details.description+"notice details")
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent for Leave request: ' + info.response);
      }
    });



    userRepo.leaverequest({reason:reason},{reqtype:reqtype},{requestto:requestto},{status:status},{fromdate:fromdate},{todate:todate},{name:name},(err,data)=>{
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
    var reason=req.body.reason
    var requestto=req.body.requestto
    var name=req.body.name;
    console.log(requestto,name,reason+"at service");

  
    userRepo.leaveupdate({requestto:requestto},{status:status},(err,data)=>{
      if(data){
      res.json({
        "msg":"leavestatus Update",
        "data":data 

      })

    
      if(status=="Approved"){
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:'sandeep.reddy@zyclyx.com',
          pass: 'cweaaodfhejidcga'
        }
      });
      
      var mailOptions = {
        from: 'sampathkumar0078@gmail.com',
        to: 'umeshrapolu29@gmail.com',
        subject: 'Leave status',
        
        
        text: 'Dear '+name+','+('\n\n')+'Your leave request has been '+status+'.'+('\n\n')+'Thanks and regards.'+('\n\n')+' HR Operations'+'.',
        // attachments: [{ filename: resume, content: fs.createReadStream(`./uploads/images/${resume}`) }]
        
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
      
      else {

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user:'sandeep.reddy@zyclyx.com',
            pass: 'cweaaodfhejidcga'
          }
        });
        
        var mailOptions = {
          from: 'sampathkumar0078@gmail.com',
          to: 'umeshrapolu29@gmail.com',
          subject: 'Leave status',
          
          
          text: 'Dear '+name+','+('\n\n')+'Your leave request has been '+status+'.' +'Due to '+reason+'.'+('\n\n')+'Thanks and regards.'+('\n\n')+' HR Operations'+'.',
          // attachments: [{ filename: resume, content: fs.createReadStream(`./uploads/images/${resume}`) }]
          
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
  // var year = date.getFullYear();
  // var day = date.getDay();
  // var mon = date.getMonth() + 1;
  // console.log(year,mon,day+"day is")
  var date1 = new Date(date);
  console.log(date1+"date is")
console.log(date1.toLocaleString('en-US', {
      weekday: 'long',
  
    }));
    var dayofname=date1.toLocaleString('en-US', {
      weekday: 'long'})
      console.log(dayofname+"name is")

  console.log(date,reason,holidaytype,dayofweek+"at servive")

  userRepo.addholiday({date:date},{reason:reason},{holidaytype:holidaytype},{dayofname:dayofname},(err,data)=>{
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
  console.log(holidaytype+"at service")

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
  if (req.file === undefined){
    var file= 'https://hrmsbackend.herokuapp.com/images/'+'logo-2.jpg';
     
   }
   else{
      var file= 'https://hrmsbackend.herokuapp.com/images/'+ req.file.originalname;

   }
  console.log(date,title,description,file+"at service");
  userRepo.addnotice({date:date},{title:title},{description:description},{file:file},(err,data)=>{
    if(data){
      res.json({
        "msg":"addnotice data",
        "data":data
      })
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:'sandeep.reddy@zyclyx.com',
          pass: 'cweaaodfhejidcga'
        }
      });
      
      var mailOptions = {
        from: 'sampathkumar0078@gmail.com',
        to: 'umeshrapolu29@gmail.com',
        subject: 'New Notification-'+title,
        
        
        text: 'Dears, '+('\n\n')+'You have a new notification..!'+('\n\n')+description+('\n\n')+'Thanks and regards.'+('\n\n')+' HR Operations'+'.',
         
        
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
  var file= 'https://hrmsbackend.herokuapp.com/images/'+ req.file.originalname;
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
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:'sandeep.reddy@zyclyx.com',
          pass: 'cweaaodfhejidcga'
        }
      });
      
      var mailOptions = {
        from: 'sampathkumar0078@gmail.com',
        to: 'umeshrapolu29@gmail.com',
        subject:'Reimbursement request from '+employeename+',',
        
        
        text: 'Dear manager'+('\n')+'Please approve me the reimbursement request for the item is '+item+' for the purpose of '+description+' with the transaction id '+email+' and the amount of this item is '+amount+'.'+('\n')+'Thanks and regards.'+('\n')+employeename+'.'
        
    };
      //console.log(details.title,details.description+"notice details")
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent for update leave status111: ' + info.response);
          res.send("success")
        }
      });
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
  var name=req.body.name;
  console.log(TID,astatus+"at service");

  userRepo.upadatestatusiprocurement({TID:TID},{astatus:astatus},(err,data)=>{
    if(data){
      res.json({
        "msg":"data retrived",
        "data":data
      })
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:'sandeep.reddy@zyclyx.com',
          pass: 'cweaaodfhejidcga'
        }
      });
      
      var mailOptions = {
        from: 'sampathkumar0078@gmail.com',
        to: 'umeshrapolu29@gmail.com',
        subject: 'Reimbursement status',
        
        
        text: 'Dear '+name+','+('\n')+'Your reimbursement request has been '+astatus+'.'+('\n')+'Thanks and regards.'+('\n')+'Zyclyx'+'.'
        
    };
      //console.log(details.title,details.description+"notice details")
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent for Reimbursement status: ' + info.response);
        }
      });

    }
    else{
      res.json({
        "msg":"data not getting",
        "data":err
      })
    }
  })
})

module.exports.getleavedata=((req,res)=>{
  var name=req.body.name;
  console.log(name+"at service")
  userRepo.getleavedata({name:name},(err,data)=>{
    if(data){
      res.json({
        "msg":"leavedata",
        "data":data
      })
    }
    else{
      res.json({
        "msg":" not getting leavedata",
        "data":err
      })
    }
  })
})
module.exports.getappovediprodata=((req,res)=>{
  var email=req.body.email;
  console.log(email+"at service");
  userRepo.getapprovediprodata({email:email},(err,data)=>{
    if(data){
      res.json({
        "msg":"data Retrived",
        "data":data

      })
    }
    else{
      res.json({
        "msg":"data  not Retrived",
        "data":err

      })
    }
  })
})
module.exports.getallemployeenames=((req,res)=>{
  userRepo.getallemployeenames({},(err,data)=>{
    if(data){
      res.json({
        "msg":"get names",
        "data":data
      })
    }
    else{
      res.json({
        "msg":" not get names",
        "data":err
      })
    }

  })
})
module.exports.uploadpayslips=((req,res)=>{
  var name=req.body.name;
  var email=req.body.email;
  var file='https://hrmsbackend.herokuapp.com/images/'+ req.file.originalname;
  const resume = req.file.originalname;
  var month=req.body.month;
  var year=req.body.year
  console.log(email,file,month,year,resume+"at service")
  userRepo.uploadpayslips({email:email},{file:file},{month:month},{year:year},(err,data)=>{
    if(data){
      res.json({
        "msg":"get names details",
        "data":data
      })
 
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: 'false',
      port: '25',
      auth: {
        user:'sandeep.reddy@zyclyx.com',
        pass: 'cweaaodfhejidcga'
      },
      tls: {
        rejectUnauthorized: false
    },
  
    });
  
    
    var mailOptions = {
      from: 'sampathkumar0078@gmail.com',
      to: 'umeshrapolu29@gmail.com',
      subject: 'Uploaded Payslip',
      
      
      text: 'Dear '+email+','+'\n'+'Please find the attached payslip for the month of '+month+'-'+year+''+'\n'+'Thanks and regards.'+('\n')+'Zyclyx'+'.',
       attachments: [{ filename: resume, content: fs.createReadStream(`./uploads/images/${resume}`) }]
      
  };
    //console.log(details.title,details.description+"notice details")
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent for Reimbursement status: ' + info.response);
      }
    });
    }
    else{
      res.json({
        "msg":"get names details",
        "data":err
      })
    }
  })
})
  module.exports.getpayslips=((req,res)=>{
    var email=req.body.email;
    var month=req.body.month;
    var year=req.body.year;
    console.log(email,month,year+"ar service");
    userRepo.getpayslips({email:email},{month:month},{year:year},(err,data)=>{
      if(data){
        res.json({
          "msg":"get names",
          "data":data
        })
      }
      else{
        res.json({
          "msg":"get names",
          "data":err
        })
      }
    })
  })
  module.exports.downloadpayslips=((req,res)=>{
    var email=req.body.email;
    var month=req.body.month;
    var year=req.body.year;
    console.log(email,month,year+"ar service");
    userRepo.downloadpayslips({email,email},{month,month},{year,year},(err,data)=>{
      if(data){
        res.json({
          "msg":"download payslips",
          "data":data
        })
        
      }
      else{
        res.json({
          "msg":"error in downloadpayslips",
          "data":err
        })
      }
    })
  })
  module.exports.attendence=((req,res)=>{
    var email= req.body.email;
    var status=req.body.status;
    userRepo.attendence({email:email},{status:status},(err,data)=>{
      if(data){
        res.json({
          "msg":"data retrived",
          "data":data
        })
      }
      else{
        res.json({
          "msg":"data retrived",
          "data":err
        })
      }
    })
  })
  module.exports.admin=((req,res)=>{
    var firstname=req.body.firstname;
   
    var email=req.body.email;
    var password=req.body.password;
    if (req.file === undefined){
    var file= 'https://hrmsbackend.herokuapp.com/images/'+'logo-2.jpg';
     
   }
   else{
      var file= 'https://hrmsbackend.herokuapp.com/images/'+ req.file.originalname;

   }
    console.log(firstname,file,email,password+" at service")
    userRepo.admin({firstname:firstname},{file:file},{email:email},{password:password},(err,data)=>{
      if(data){
        res.json({
          "msg":"admin register successfully",
          "data":data
        })
      }
      else{
        res.json({
          "msg":"admin register Failed",
          "data":err
        })
      }
    })
  })
  module.exports.adminlogin=((req,res)=>{
   
    var email=req.body.email;
    var password=req.body.password;
    var pass;
    console.log(email,password+"at service")

    userRepo.adminlogin({email:email},(err,data)=>{
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
  module.exports.getiprocurementdata=((req,res)=>{
    var tid=req.body.tid;
    console.log(tid+"at service")
    userRepo.getiprocurementdata({tid:tid},(err,data)=>{
      if(data){
        res.json({
          "msg":"data retived",
          "data":data
        })
      }
      else{
        res.json({
          "msg":"data not retived",
          "data":err
        })
      }
    })
  })
  module.exports.forgotpassword=((req,res)=>{
    string=randomstring.generate(7);
    console.log(string+"is")
    var string1=string;
    var fmail=req.body.fmail;
    console.log(fmail+"at service")
    var  smtptransport=nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:'sandeep.reddy@zyclyx.com',
        pass: 'cweaaodfhejidcga'
      }
  });
  var mailOption={
      to:'umeshrapolu29@gmail.com',
      from:fmail,
      subject:'reset password',
      text:'change password\n\n'+string,  
  };
  smtptransport.sendMail(mailOption,function(err,data){
      if(err){
      console.log("mail not sent");
      console.log(err);
      }
      else{
          console.log("mail sent");
          // res.json({
          //     "msg":"Token Sent to Email",
              
          // })
          console.log(string1 + "at service1")
          userRepo.storetoken({fmail:fmail},{string1:string1},(req,data)=>{
              res.json({
                  "msg":"password updated",
                  "data":data
              })
          })
    
         
       
      }
  })

  })
  module.exports.resetpassword=((req,res)=>{
    var token1=req.body.token1
    var updatepassword=req.body.updatepassword
     var fmail=req.body.fmail;
    
    
  
  
    var string1=string;
    console.log(fmail+"is")
    console.log(token1,updatepassword ,fmail+ "at service")
    userRepo.resetpassword({fmail:fmail},token1,{updatepassword:updatepassword},(req,result)=>{
        res.json({
            "msg":"password updated",
            "data":result
        })
     })
    })
    module.exports.allholidays=((req,res)=>{
      userRepo.allholidays({},(err,data)=>{
        if(data){
          res.json({
            "msg":"data Retrived",
            "data":data
          })
        }
        else{
          res.json({
            "msg":"data not Retrived",
            "data":err
          })
        }
      })

    })