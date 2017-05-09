/**
 * New node file
 */
const express=require('express');
const cookieParser=require('cookie-parser');

var server=express();
server.listen(8080);

//cookie
server.use(cookieParser());

server.use('/aaa/a.html',function(req,res){
//	res.send(req.cookies);
	
	req.secret='xuaiooasu65hg66';
	res.cookie('user1','xiao1',{signed:true});
	res.send('ok!');
	res.end();
})
