const express=require("express");

var server=express();

//server.use('/',function(req,res){
//	res.send("走进了use路径");
//	res.end();
//});

server.get('/',function(req,res){
	res.send("走进了GET路径");
	res.end();
});

server.post('/',function(req,res){
	res.send("走进了POST路径");
	res.end();
});

server.listen(8080);
