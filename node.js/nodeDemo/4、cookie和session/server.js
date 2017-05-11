/**
 * New node file
 */
const express=require('express');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');

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


//session

server.use(cookieSession({
	//手动设置session名
	name:'sess',
	//手动设置session密钥
	keys:['aaa','bbb','ccc'],
	//手动设置session过期时间，单位为毫秒
	maxAge:30*60*1000
}));

server.use('/aaa/b.html',function(req,res){
	
	if(req.session['count']==null){
		req.session['count']=1;
	}else{
		req.session['count']++;
	}
	
	//console.log(req.session);
	console.log(req.session['count']);
	res.send('ok!');
	res.end();
})
