/**
 * New node file
 */
const express=require('express');

var server=express();
server.listen(8080);

//目录1：/user/
var routUser=express.Router();

routUser.get('/1.html',function(req,res){    //http://xxx.com/user/1.html
	res.send('user1');
});

routUser.get('/2.html',function(req,res){    //http://xxx.com/user/2.html
	res.send('user2');
});

server.use('/user',routUser);

//目录2：/article/
var articleRouter=express.Router();
articleRouter.get('/1.html',function(req,res){    //http://xxx.com/user/1.html
	res.send('user1a');
});

articleRouter.get('/2.html',function(req,res){    //http://xxx.com/user/2.html
	res.send('user2a');
});

server.use('/article',articleRouter);