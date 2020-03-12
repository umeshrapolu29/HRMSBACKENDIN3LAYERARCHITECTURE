var express=require('express');
var mongoose=require('mongoose');
 var db=require('./route/Database/db');
 const dotenv=require('dotenv');
 dotenv.config();
 const user = process.env.USER;
const password = process.env.PASSWORD;
 const path = require('path');
 var cors = require('cors');
 var url=db.url
 var app=express();
 var route=express.Router();
 const PORT = process.env.PORT || 3001;
var server = app.listen(PORT)
app.use(express.static(path.join(__dirname, 'uploads')));
app.use("/public", express.static('public'))

var bodyparser=require('body-parser');
app.use(express.static(__dirname+'/uploads'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authoriuzation');
  if(req.method==='OPTIONS'){
      res.header('Access-Control-Allow-Methods','PUT,POST,DELETE,PATCH,GET')
      return res.status(200).json({});
  }
  next();

})
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})



//   var userregister=require('./route/controllers/userregister');
//   {
//       app.use('/user',userregister)
//   }
//   app.get('/', (req, res) => {
// })
var userregister=require('./route/controllers/usercontroller');
  {
      app.use('/user',userregister)
  }
//   app.get('/', (req, res) => {
//       res.send("hello")
// })
     
    



mongoose.connect(url,()=>{

}).then(result=>{
    console.log('connected')

}).catch(error=>{
    throw error
})



//  app.listen(3002,()=>{
//  console.log('Server is running at port'+ 3002)
//  })