/**
 * New node file
 */
const express=require('express');
const static=require('express-static');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const bodyParser=require('body-parser');
const multer=require('multer');
const fs=require('fs');
const path=require('path');
const ejs=require('ejs');

var server=express();
server.listen(8080);


//1.解析cookie
server.use(cookieParser('asdjhwu2y3f8y83efgt44'));

//2.使用session
var arr=[];
for (var i=0;i<100000;i++) {
	arr.push("xime_"+Math.random());
}
server.use(cookieSession({name:'sess',keys:arr,maxAge:30*60*1000}));

//3.post数据
server.use(bodyParser.urlencoded({extended:false}));
server.use(multer({dest:'./www/data'}).any);

//用户请求
server.use('/',function(req,res,next){
	console.log(req.cookies,req.session,req.files,req.body,req.query)
})

//4.static数据
server.use(static('./www'));
