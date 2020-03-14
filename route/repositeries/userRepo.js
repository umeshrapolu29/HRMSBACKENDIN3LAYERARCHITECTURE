var Schema=require('../Model/schema');
var uploadschema=require('../Model/upoladschema');
var loginschema=require('../Model/loginschema');
var leaverequestschema=require('../Model/leaverequestschema');
var holidayschema=require('../Model/holidayschema');
var noticeboardschema=require('../Model/noticeboardschema');
var iprocurementschema=require('../Model/iprocurementschema');
var payslipschema=require('../Model/payslipschema');
var nodemailer=require('nodemailer');
var attendenceschema=require('../Model/attendenceshema');
var adminschema=require('../Model/adminschema');
var educationalschema=require('../Model/educationalschema');
var bankdetailsschema=require('../Model/bankdetailsschema');
var companydetailsschema=require('../Model/companydetailsschema');
 var personaldetailsschema=require('../Model/personaldetailschema');
module.exports.upload=(firstname,lastname, email,password,file,DOJ,phonenumber,gender,DOB,resgination,callback)=>{
    console.log(firstname,lastname,resgination+"at repo")
    uploadschema.find({"email":{$ne:null}}).then(result=>{
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var regid=Object.keys(result).length;
        console.log(regid+"result is");
        
        var fullid = "ZYX_" + year + "_" + month + "_" + regid;
        console.log(fullid + " full id");
    
    var reg=new uploadschema({
        firstname:firstname.firstname,
        lastname:lastname.lastname,
        email:email.email,
        password:password.password,
        file:file.file,
        DOJ:DOJ.DOJ,
        phonenumber:phonenumber.phonenumber,
        gender:gender.gender,
        DOB:DOB.DOB,
        resgination:resgination.resgination,
        fullid:fullid,
       

      
     
   
     

  
    })
    reg.save()
    .then(result=>{
        callback(null,result)
        console.log(result);
    }).catch(error=>{
        callback(null,error)
    })
}).catch(error=>{
    callback(null,error);
})

}
module.exports.login=(email,callback)=>{

    uploadschema.findOne(email).then(result=>{
        callback(null,result);
        console.log(result);
    })
    .catch(error=>{
        callback(null,error)
    })



}
// get user data.........................................
module.exports.getuserdata=(email,callback)=>{
    uploadschema.findOne(email).then(result=>{
        callback(null,result);
        console.log(result);
    })
    .catch(error=>{
        callback(null,error)
    })

}
// Leave Request.........................
module.exports.leaverequest=(reason,reqtype,requestto,status,fromdate,todate,name,callback)=>{
    leaverequestschema.find({"requestto":{$ne:null}}).then(result=>{
        var regid=Object.keys(result).length;
        console.log(regid+"result is");
    var reg=new leaverequestschema({
        reason:reason.reason,
        reqtype:reqtype.reqtype,
        requestto:requestto.requestto,
        status:status.status,
        fromdate:fromdate.fromdate,
        todate:todate.todate,
        name:name.name,
        regid:regid
       
    })
    reg.save().then(result=>{
        callback(null,result);
    }).catch(error=>{
        callback(null,error);
    }).catch(error=>{
        callback(null,error);
    })


})
}
module.exports.getleaveemployee=(callback)=>{

    leaverequestschema.find({status:{$eq:'NOT YET APPROVED'}}).then(result=>{
        callback(null,result)
    }).catch(error=>{
        callback(null,error)
    })


}
module.exports.leaveupdate=(requestto, status,callback)=>{
    console.log(requestto,status);
    leaverequestschema.updateOne({"_id":requestto.requestto},{$set:{"status":status.status}}).then(result=>{
        callback(null,result);
        console.log(result);
    })
    .catch(error=>{
        callback(null,error)
    })
}
module.exports.leaveapproveddata=(requestto,callback)=>{
    leaverequestschema.findOne(requestto).sort( { regid: -1 } ).then(result=>{
        callback(null,result);
        console.log(result);
    })
    .catch(error=>{
        callback(null,error)
    })
}
module.exports.addholiday=(date,reason,holidaytype,dayofname,callback)=>{
    console.log(date,reason,holidaytype,dayofname)
    
    var reg=new holidayschema({
        date:date.date,
        reason:reason.reason,
        holidaytype:holidaytype.holidaytype,
        dayofweek:dayofname.dayofname
        

      
       
    })
    reg.save().then(result=>{
        callback(null,result);
    }).catch(error=>{
        callback(null,error);
    })

}
module.exports.viewholiday=(holidaytype,callback)=>{
    holidayschema.find(holidaytype).then(result=>{
        callback(null,result);
        console.log(result)
    }).catch(error=>{
        callback(null,error);
    })
}
module.exports.addnotice=(date,title,description,file,callback)=>{
    var regid=1;
    noticeboardschema.find({"title":{$ne:null}}).then(result=>{
         regid=regid+Object.keys(result).length;
        
     var reg=new noticeboardschema({
        date:date.date,
        title:title.title,
        description:description.description,
        file:file.file,
        rig:regid
     })
     reg.save().then(result=>{
         callback(null,result);
         console.log(result);
     }).catch(error=>{
         callback(null,error);
     })
     .catch(error=>{
        callback(null,error);
    })


})
}
module.exports.removenotice=(title,callback)=>{
    noticeboardschema.remove({"title":title.title}).then(result=>{
        callback(null,result);
        console.log(result);
    }).catch(error=>{
        callback(null,error);
    })

}
module.exports.viewnotice=(req,callback)=>{
    noticeboardschema.find({}).then(result=>{
        callback(null,result);
        console.log(result);
    }).catch(error=>{
        callback(null,error);
    })
}

module.exports.addiprocuremnt=(item,description,amount,file,status,astatus,email,employeename,callback)=>{
    console.log(item,description,amount,file,status,astatus,email,employeename+"at repo")
    iprocurementschema.find({"email":{$ne:null}}).then(result=>{
        var regid=Object.keys(result).length;
        console.log(regid+"result is");
        var today = new Date();
        var year = today.getFullYear();
        var mon = today.getMonth() + 1;
        var tid='TID_'+year+'_'+mon+'_'+regid;
        console.log(tid+' tid is');
            var reg=new iprocurementschema({
        item:item.item,
    
        description:description.description,
        file:file.file,
        amount:amount.amount,
        status:status.status,
        astatus:astatus.astatus,
        email:email.email,
        employeename:employeename.employeename,
        TID:tid,
        rig:regid,
        
        
     })
     reg.save().then(result=>{
         callback(null,result);
         console.log(result);
     }).catch(error=>{
         callback(null,error);
     })
     .catch(error=>{
           callback(null,error);
       })

 
})
}
module.exports.getusernamesiprocurement=(astatus,callback)=>{
    console.log(astatus+"at repo");
    iprocurementschema.find({"astatus":astatus.astatus}).then(result=>{
        callback(null,result)
        console.log(result)
    }).catch(error=>{
        callback(null,error);
    })
}
module.exports.upadatestatusiprocurement=(TID,astatus,callback)=>{
    console.log(TID,astatus+"at service");
    iprocurementschema.updateOne({"TID":TID.TID},{$set:{"astatus":astatus.astatus}}).then(result=>{
        callback(null,result);
        console.log(result);
    })
    .catch(error=>{
        callback(null,error)
    })
}
module.exports.getleavedata=(name,callback)=>{
    console.log(name+"at repo")
    leaverequestschema.find({'status':{$eq:"NOT YET APPROVED"},"name":name.name}).sort( { regid: -1 } ).then(result=>{
        callback(null,result);
        console.log(result);
    }).catch(error=>{
        callback(null,error)

    })
}
module.exports.getapprovediprodata=(email,callback)=>{
    console.log(email+"at repo");
    iprocurementschema.find({"email":email.email}).then(result=>{
        callback(null,result);
        console.log(result);
    }).catch(error=>{
        callback(null,error);
    })

    }
module.exports.getallemployeenames=(req,callback)=>{
    uploadschema.find({}).then(result=>{
        callback(null,result);
        console.log(result);
    })
    .catch(error=>{
        callback(null,error);
    })
}
module.exports.uploadpayslips=(email,file,month,year,callback)=>{
    console.log(email,file,month,year+"at service")
    var reg=new payslipschema({
        email:email.email,
        file:file.file,
        month:month.month,
        year:year.year


    })
    reg.save().then(result=>{
        callback(null,result);
        console.log(result);
    }).catch(error=>{
        callback(null,error);
    })
    .catch(error=>{
          callback(null,error);
      })

}
module.exports.getpayslips=(email,month,year,callback)=>{
    console.log(email,month,year+"ar repo");
    payslipschema.find({$and:[{"email":email.email},{"month":month.month},{"year":year.year}]}).then(result=>{
        callback(null,result);
        console.log(result);
    }).catch(error=>{
        callback(null,error);
    })
}
module.exports.downloadpayslips=(email,month,year,callback)=>{
console.log(email,month,year+"ar repo");
payslipschema.find({$and:[{"email":email.email},{"month":month.month},{"year":year.year}]}).then(result=>{
    callback(null,result);
    var file=result;
    console.log(file)

  

    console.log(result);
}).catch(error=>{
    callback(null,error);
})

}
module.exports.attendence=(email,status,callback)=>{
    var today = new Date();
    console.log(today||	yyyy-mm-dd);
    console.log(today.toISOString().slice(0,10));

    var date=today.toISOString().slice(0,10)

    var reg=new attendenceschema({
        email:email.email,
        status:status.status,
        date:date,

       


    })
    reg.save().then(result=>{
        callback(null,result);
        console.log(result);
    }).catch(error=>{
        callback(null,error);
    })

}
module.exports.admin=(firstname,file,email,password,callback)=>{
    console.log(firstname,file,email,password+"at repo")
    var reg=new adminschema({
        firstname:firstname.firstname,
        file:file.file,
        email:email.email,
        password:password.password
        

      
       
    })
    reg.save().then(result=>{
        callback(null,result);
    }).catch(error=>{
        callback(null,error);
    })

}
module.exports.adminlogin=(email,callback)=>{
    console.log(email+"at repo")
    adminschema.findOne(email).then(result=>{
        callback(null,result);
        console.log(result);
    })
    .catch(error=>{
        callback(null,error)
    })

}
module.exports.getiprocurementdata=(tid,callback)=>{
    console.log(tid)

    iprocurementschema.findOne({'astatus':{$eq:"Not yet approved"},"TID":tid.tid}).then(result=>{
        callback(null,result);
        console.log(result);
    }).catch(error=>{
        callback(null,error)

    })

}
module.exports.storetoken=((fmail,string1,callback)=>{
    console.log(fmail,string1+"at repo");

    // Schema.updateOne({"_id":id.id},{$set:{passwordtoken:string.string}}).then(result=>{
    //     callback(null,result);
    // }).catch(error=>{
    //     callback(null,error);
    // })
    uploadschema.updateOne({"email":fmail.fmail},{$set:{passwordtoken:string1.string1}}).then(result=>{
        callback(null,result);

        console.log(result);
    }).catch(error=>{
        callback(null,error);
    })
 })
 module.exports.resetpassword=((fmail,token1,updatepassword,callback)=>{
    console.log(token1,updatepassword,fmail+"at repo")
    uploadschema.find({email:fmail.fmail}).then(result=>{
        
        

        var token=result[0].passwordtoken

        console.log(token);
        console.log(token1);

        if(token==token1)
        {
            uploadschema.updateOne({"email":fmail.fmail},{$set:{password:updatepassword.updatepassword}}).then(result=>{
                callback(null,result);

            }).catch(error=>{
                callback(null,error);
            })
        }
        else{
            console.log("not matched")
            callback(null,error);
        }





    }).catch(error=>{
        callback(null,error)
    })





    
 
    

  


})
module.exports.allholidays=(req,callback)=>{
    holidayschema.find({}).then(result=>{
        callback(null,result);
        console.log(result);
    }).catch(error=>{
        callback(null,error);
    })
}
module.exports.adminstoretoken=((fmail,string1,callback)=>{
    console.log(fmail,string1+"at repo");

    // Schema.updateOne({"_id":id.id},{$set:{passwordtoken:string.string}}).then(result=>{
    //     callback(null,result);
    // }).catch(error=>{
    //     callback(null,error);
    // })
    adminschema.updateOne({"email":fmail.fmail},{$set:{passwordtoken:string1.string1}}).then(result=>{
        callback(null,result);

        console.log(result);
    }).catch(error=>{
        callback(null,error);
    })
 })
 module.exports.adminresetpassword=((fmail,token1,updatepassword,callback)=>{
    console.log(token1,updatepassword,fmail+"at repo")
    adminschema.find({email:fmail.fmail}).then(result=>{
        console.log("inside block")
        
        

        var token=result[0].passwordtoken

        console.log(token);
        console.log(token1);

        if(token==token1)
        {
            adminschema.updateOne({"email":fmail.fmail},{$set:{password:updatepassword.updatepassword}}).then(result=>{
                callback(null,result);

            }).catch(error=>{
                callback(null,error);
            })
        }
        else{
            console.log("not matched")
            callback(null,error);
        }





    }).catch(error=>{
        callback(null,error)
    })





    
 
    

  


})
module.exports.deleteuser=(id,callback)=>{
    console.log(id+"at repo")
    uploadschema.remove({"_id":id.id}).then(result=>{
        callback(null,result);
        console.log(result);
    }).catch(error=>{
        callback(null,error);
    })
    
}

module.exports.educational=(empname,tenth,intermediate,degree,pg,callback)=>{
    console.log(tenth,intermediate,degree+"at repo")
    educationalschema.find({"empname":{$ne:null}}).then(result=>{
        var regid=Object.keys(result).length;
        console.log(regid+"result is");
   var reg=new educationalschema({
         empname:empname.empname,
        tenth:tenth.tenth,
        intermediate:intermediate.intermediate,
        degree:degree.degree,
        pg:pg.pg,
        rig:regid
        

      
       
    })
    reg.save().then(result=>{
        callback(null,result);
        console.log(result)
    }).catch(error=>{
        console.log("error")
        callback(null,error);
        
    })
}).catch(error=>{
    callback(null,error);
})

}
module.exports.bankdeatils=(empname,Accountholdername,Accountnumber,Bankname,pannumber,branch,IFSCcode,callback)=>{
     console.log(Accountholdername,Accountnumber,Bankname,pannumber,IFSCcode+"at repo")
     bankdetailsschema.find({"empname":{$ne:null}}).then(result=>{
        var regid=Object.keys(result).length;
        console.log(regid+"result is");
    
   
    var reg=new bankdetailsschema({
        empname:empname.empname,
        Accountholdername:Accountholdername.Accountholdername,
        Accountnumber:Accountnumber.Accountnumber,
        Bankname:Bankname.Bankname,
        pannumber:pannumber.pannumber,
        branch:branch.branch,
        IFSCcode:IFSCcode.IFSCcode,
        rig:regid
    })
    reg.save()
    .then(result=>{
        callback(null,result);
      
    }).catch(error=>{
        console.log("error")
        callback(null,error);
        
    })
}).catch(error=>{
    callback(null,error);
})
}
module.exports.companydetails=(empname,companyname,designation,experiance,callback)=>{
    console.log(empname,companyname,designation,experiance+"at repo")
    companydetailsschema.find({"empname":{$ne:null}}).then(result=>{
        var regid=Object.keys(result).length;
        console.log(regid+"result is");
   var reg=new companydetailsschema({
    empname:empname.empname,
    companyname:companyname.companyname,
    designation:designation.designation,
    experience:experiance.experiance,
    rig:regid
   })
    reg.save().then(result=>{
        callback(null,result);
        console.log(result)
    }).catch(error=>{
        console.log("error")
        callback(null,error);
        
    })
}).catch(error=>{
    callback(null,error);
})

}
module.exports.personaldetails=(empname,primaryemailid,secondaryemailid,gaurdain,gaurdainnumber,callback)=>{
    console.log(empname,primaryemailid,secondaryemailid,gaurdainnumber+"at repo")
    personaldetailsschema.find({"empname":{$ne:null}}).then(result=>{
        var regid=Object.keys(result).length;
        console.log(regid+"result is");
   var reg=new personaldetailsschema({
    empname:empname.empname,
    primaryemailid:primaryemailid.primaryemailid,
    secondaryemailid:secondaryemailid.secondaryemailid,
    gaurdain:gaurdain.gaurdain,
    gaurdainnumber:gaurdainnumber.gaurdainnumber,
    rig:regid
   })
    reg.save().then(result=>{
        callback(null,result);
        console.log(result)
    }).catch(error=>{
        console.log("error")
        callback(null,error);
        
    })
}).catch(error=>{
    callback(null,error);
})

    

}
module.exports.geteducationaldetails=(empname,callback)=>{
    educationalschema.find({"empname":{$ne:null}}).then(result=>{
        var regid=Object.keys(result).length;
         var rid=regid-1;
        console.log(regid+"result is");
    
        educationalschema.findOne({'rig':{$eq:rid},"empname":empname.empname}).then(result=>{
        callback(null,result);
        console.log(result.data);
    }).catch(error=>{
        callback(null,error);
    })
}).catch(error=>{
    callback(null,error);
})

}
module.exports.getbankldetails=(empname,callback)=>{
    bankdetailsschema.find({"empname":{$ne:null}}).then(result=>{
        var regid=Object.keys(result).length;
         var rid=regid-1;
        console.log(regid+"result is");
        bankdetailsschema.findOne({'rig':{$eq:rid},"empname":empname.empname}).then(result=>{
        callback(null,result);
        console.log(result.data);
    }).catch(error=>{
        callback(null,error);
    })
}).catch(error=>{
    callback(null,error);
})
}
module.exports.getcompanydetails=(empname,callback)=>{
    companydetailsschema.find({"empname":{$ne:null}}).then(result=>{
        var regid=Object.keys(result).length;
         var rid=regid-1;
        console.log(regid+"result is");
        companydetailsschema.findOne({'rig':{$eq:rid},"empname":empname.empname}).then(result=>{
        callback(null,result);
        console.log(result.data);
    }).catch(error=>{
        callback(null,error);
    })
}).catch(error=>{
    callback(null,error);
})
}
module.exports.getpersonaldetails=(empname,callback)=>{
    personaldetailsschema.find({"empname":{$ne:null}}).then(result=>{
        var regid=Object.keys(result).length;
         var rid=regid-1;
        console.log(regid+"result is");
        personaldetailsschema.findOne({'rig':{$eq:rid},"empname":empname.empname}).then(result=>{
        callback(null,result);
        console.log(result.data);
    }).catch(error=>{
        callback(null,error);
    })
}).catch(error=>{
    callback(null,error);
})
}
