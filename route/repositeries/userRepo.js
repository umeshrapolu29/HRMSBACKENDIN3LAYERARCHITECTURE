var Schema=require('../Model/schema');
var uploadschema=require('../Model/upoladschema');
var loginschema=require('../Model/loginschema');
var leaverequestschema=require('../Model/leaverequestschema');
var holidayschema=require('../Model/holidayschema');
var noticeboardschema=require('../Model/noticeboardschema');
var iprocurementschema=require('../Model/iprocurementschema');
var nodemailer=require('nodemailer');

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
module.exports.leaverequest=(reason,reqtype,requestto,status,fromdate,todate,callback)=>{
    var reg=new leaverequestschema({
        reason:reason.reason,
        reqtype:reqtype.reqtype,
        requestto:requestto.requestto,
        status:status.status,
        fromdate:fromdate.fromdate,
        todate:todate.todate,
       
    })
    reg.save().then(result=>{
        callback(null,result);
    }).catch(error=>{
        callback(null,error);
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
    leaverequestschema.updateOne({"requestto":requestto.requestto},{$set:{"status":status.status}}).then(result=>{
        callback(null,result);
        console.log(result);
    })
    .catch(error=>{
        callback(null,error)
    })
}
module.exports.leaveapproveddata=(requestto,callback)=>{
    leaverequestschema.findOne(requestto).then(result=>{
        callback(null,result);
        console.log(result);
    })
    .catch(error=>{
        callback(null,error)
    })
}
module.exports.addholiday=(date,reason,holidaytype,dayofweek,callback)=>{
    console.log(date,reason,holidaytype,dayofweek+"at repo")
    var reg=new holidayschema({
        date:date.date,
        reason:reason.reason,
        holidaytype:holidaytype.holidaytype,
        dayofweek:dayofweek.dayofweek
        

      
       
    })
    reg.save().then(result=>{
        callback(null,result);
    }).catch(error=>{
        callback(null,error);
    })

}
module.exports.viewholiday=(holidaytype,callback)=>{
    holidayschema.findOne(holidaytype).then(result=>{
        callback(null,result);
        console.log(result)
    }).catch(error=>{
        callback(null,error);
    })
}
module.exports.addnotice=(date,title,description,file,callback)=>{
     var reg=new noticeboardschema({
        date:date.date,
        title:title.title,
        description:description.description,
        file:file.file
     })
     reg.save().then(result=>{
         callback(null,result);
         console.log(result);
     }).catch(error=>{
         callback(null,error);
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
        TID:tid
        
        
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
    iprocurementschema.findOne({"astatus":astatus.astatus}).then(result=>{
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