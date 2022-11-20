let express = require('express');
let app = express();
let bodyParser = require('body-parser');
console.log("Hello World");


app.use("/",function (req,res,next){
  console.log(req.method+" "+req.path+" - "+req.ip);
  next();
});

app.use("/public", express.static(__dirname+"/public"));

app.get('/',function (req,res){
  res.sendFile(__dirname+"/views/index.html");
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/json',function (req,res){
  message = "Hello json"
  if (process.env['MESSAGE_STYLE'] === "uppercase")
      message = message.toUpperCase();
  res.json({"message": message});
});

app.get('/now',function (req,res,next){
  req.time = new Date().toString();
  next();
}, function (req,res){
  res.json({"time": req.time});
});

app.get('/:word/echo',function (req,res){
  res.json({"echo": req.params.word});
});

app.route('/name').get(function (req,res){
  res.json({"name": req.query['first']+" "+req.query['last']});
}).post(function(req,res){
  res.json({"name": req.body['first']+" "+req.body['last']});
});



// app.use(bodyParser.json());
// const mySecret = process.env['MESSAGE_STYLE']







 module.exports = app;
