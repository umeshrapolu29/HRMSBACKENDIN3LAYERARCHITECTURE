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
route.post('/login',upload.single('file'),(req,res)=>{
  return userservice.login(req,res);
})
route.post('/getuserdata',upload.single('file'),(req,res)=>{
  return userservice.getuserdata(req,res);
})
route.post('/leaverequest',upload.single('file'),(req,res)=>{
  return userservice.leaverequest(req,res);
})
route.get('/getleaveemployee',upload.single('file'),(req,res)=>{
  return userservice.getleaveemployee(req,res);
})
route.post('/getleavedata',upload.single('file'),(req,res)=>{
  return userservice.getleavedata(req,res);
})
route.post('/leaveupdate',upload.single('file'),(req,res)=>{
  return userservice.leaveupdate(req,res);

})
route.post('/leaveapproveddata',upload.single('file'),(req,res)=>{
  return userservice.leaveapproveddata(req,res);
})
route.post('/addholiday',upload.single('file'),(req,res)=>{
  return userservice.addholiday(req,res);
})
route.post('/viewholiday',upload.single('file'),(req,res)=>{
  return userservice.viewholiday(req,res);
})
route.post('/addnotice',upload.single('file'),(req,res)=>{
  return userservice.addnotice(req,res);
})
route.post('/removenotice',upload.single('file'),(req,res)=>{
  return userservice.removenotice(req,res);
})
route.get('/viewnotice',upload.single('file'),(req,res)=>{
  return userservice.viewnotice(req,res);

})
route.post('/addiprocurement',upload.single('file'),(req,res)=>{
  return userservice.addiprocurement(req,res);
})
route.get('/getusernamesiprocurement',upload.single('file'),(req,res)=>{
  return userservice.getusernamesiprocurement(req,res)
})
route.post('/updatestatusiprocurement',upload.single('file'),(req,res)=>{
  return userservice.updatestatusiprocuremnt(req,res);
})
route.post('/getapprovediprodata',upload.single('file'),(req,res)=>{
  return userservice.getappovediprodata(req,res);
})
route.get('/getallemployeenames',upload.single('file'),(req,res)=>{
  return userservice.getallemployeenames(req,res);
})
route.post('/uploadpayslips',upload.single('file'),(req,res)=>{
  return userservice.uploadpayslips(req,res);
})
route.post('/getpayslips',upload.single('file'),(req,res)=>{
  return userservice.getpayslips(req,res);
})
route.post('/downloadpayslip',upload.single('file'),(req,res)=>{
  return userservice.downloadpayslips(req,res);
})
route.post('/attendence',upload.single('file'),(req,res)=>{
  return userservice.attendence(req,res);

})
route.post('/admin',upload.single('file'),(req,res)=>{
  return userservice.admin(req,res);
})
route.post('/adminlogin',upload.single('file'),(req,res)=>{
  return userservice.adminlogin(req,res);
})
route.post('/getiprocurementdata',upload.single('file'),(req,res)=>{
  return userservice.getiprocurementdata(req,res);
})
route.post('/forgotpassword',upload.single('file'),(req,res)=>{
  return userservice.forgotpassword(req,res);
})
route.post('/resetpassword',upload.single(),(req,res)=>{
  return userservice.resetpassword(req,res);
})
route.get('/allholidays',upload.single('file'),(req,res)=>{
  return userservice.allholidays(req,res);
})
route.post('/adminforgetpassword',upload.single('file'),(req,res)=>{
  return userservice.adminforgotpassword(req,res);
})
route.post('/adminresetpassword',upload.single('file'),(req,res)=>{
  return userservice.adminresetpassword(req,res);
})
route.post('/deleteuser',upload.single('file'),(req,res)=>{
  return userservice.deleteuser(req,res);
})
route.post('/educationdetails',upload.single('file'),(req,res)=>{
  return userservice.educational(req,res);
})
route.post('/bankdetails',upload.single('file'),(req,res)=>{
  return userservice.bankdetails(req,res);
})
route.post('/companydetails',upload.single('file'),(req,res)=>{
  return userservice.companydetails(req,res);
})
route.post('/personaldetails',upload.single('file'),(req,res)=>{
  return userservice.personaldetails(req,res);
})
route.post('/geteducationaldetails',upload.single('file'),(req,res)=>{
  return userservice.geteducationaldetails(req,res);
})
route.post('/getbankdetails',upload.single('file'),(req,res)=>{
  return userservice.getbankdetails(req,res);
})
route.post('/getcompanydetails',upload.single('file'),(req,res)=>{
  return userservice.getcompanydetails(req,res);
})
route.post('/getpersonaldetails',upload.single('file'),(req,res)=>{
  return userservice.getpersonaldetails(req,res);
})
 module.exports=route;