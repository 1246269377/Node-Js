/**
 * New node file
 * 数据接口的测试服务器
 * 测试登录
 */
const express=require("express");
const expressStatic=require("express-static");          //封装好的读取文件模块

var server=express();
server.listen(8080);

//用户数据
var users={
	'blue':'123456',
	'xiao':'123123',
	'lili':'111111'
}

server.get('/login',function(req,res){
	var user=req.query['user'];
	var pass=req.query['pass'];
	
	if (users[user]==null) {
		res.send({ok:false,msg:"此用户不存在！"});
	}else{
		if(users[user]!=pass){
			res.send({ok:false,msg:"密码输入错误!"});
		}else{
			res.send({ok:true,msg:"用户登录成功！"});
		}
	}
});

server.use(expressStatic("./www"));                     //函数中填写文件存放地址