var express=require('express');
var mongoose=require('mongoose');
 var db=require('./route/Database/db')
 var url=db.url
 var app=express();
 var route=express.Router();
var server = app.listen(3002)

 
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