/**
 * New node file
 * 数据解析的测试服务器
 */
const express=require("express");
const bodyParser=require("body-parser");

var server=express();
server.listen(8080);

server.use(bodyParser.urlencoded({
	limit: 2*1024*1024               //大小限制 2MB ,默认大小：100KB
}));

//GET POST
server.use('/',function(req,res){
	//console.log(req.query); //GET
	
	//console.log(req.body); //POST
})
server.use('/',function(req,res,next){
	console.log("123")
	
	next();
})
