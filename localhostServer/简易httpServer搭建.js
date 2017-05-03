/**
 * New node file
 * 
 * 约定的接口-----act=login(登录)/reg(注册)&name=''&pass=''
 * ok:true/false 本次连接成功或失败
 * msg:提示信息
 */
const http = require("http");
const fs = require("fs");
const querystring = require("querystring");
const urlLib = require("url");

var users = {
		'blue': '123456',
		'zhangsan': '666666'
	} //储存用户数据   {'blue':'123456','zhangsan':'666666'}

var server = http.createServer(function(request, response) {
	//解析数据
	var str = '';

	request.on("data", function(data) {
		str += data;
	});
	request.on("end", function() {
		var obj = urlLib.parse(request.url, true);

		const url = obj.pathname;
		const GET = obj.query;
		const POST = querystring.parse(str);
		
		

		//区分--文件、接口
		if(url == '/user') { //接口
			switch(GET.act) {
				case 'reg':
				//1.检查用户名是否已经存在
				if (users[GET.name]) {
					response.write('{"ok":false,"msg":"用户名已存在"}');
				}else{//2.注册用户名
					users[GET.name]=GET.pass;
					response.write('{"ok":true,"msg":"用户名注册成功"}');
				}
					break;
				case 'login':
				//1.检查用户名是否已经存在
				if(users[GET.name]==null){
					response.write('{"ok":false,"msg":"用户名不存在"}');
				}else if(users[GET.name]!=GET.pass){
					response.write('{"ok":false,"msg":"密码不正确"}');
				}else{
					response.write('{"ok":true,"msg":"登录成功"}');
				}
				//2.检查密码是否正确
					break;
				default:
				response.write('{"ok":false,"msg":"端口输入错误"}');
					break;
			}
			response.end();
		} else { //文件
			//读取文件
			var newUrl='';
			if (url==''||url=='/') {
				newUrl='/index.html';
			}else{
				newUrl=url;
			}
			var file_name = "../localhostDemo" + newUrl;
			fs.readFile(file_name, function(err, data) {
				if(err) {
					response.write('{"ok":false,"msg":'+newUrl+'}');
				} else {
					response.write(data);
				}
				response.end();
			});
		}
	})
});

server.listen(8080)