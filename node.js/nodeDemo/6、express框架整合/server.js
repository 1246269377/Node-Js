/**
 * New node file
 */
const express=require('express');                //express基础框架
const static=require('express-static');          //文件读取模块
const cookieParser=require('cookie-parser');     //cookie操作模块
const cookieSession=require('cookie-session');   //session操作模块
const bodyParser=require('body-parser');         //post数据解析模块
const multer=require('multer');                  //post文件解析模块
const fs=require('fs');                          //文件操作模块
const path=require('path');                      //处理文件路径的小工具
const consolidate=require('consolidate');        //模板引擎整合库
//const ejs=require('ejs');                      //ejs模板引擎

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
server.use(multer({dest:'./www/data'}).any());

//4.配置模板引擎
//输出什么东西（html/xml/pdf/excl...）
server.set('view engine','html');
//模板文件所在位置
server.set('views','./views');
//哪种模板引擎
server.engine('html',consolidate.ejs);

//5、接受用户请求
server.get('/index',function(req,res){
	if (req.session.userid) {//登录过
		res.render('hom.ejs',{name:'xiao'});
	} else{
		res.render('login.ejs',{});
	}
})

server.get('/login',function(req,res){
	if (!req.session['userid']) {
		req.session['userid']=1;
	}
	res.render('hom.ejs',{name:req.query.user});
})

//6.static数据
server.use(static('./www'));
