/**
 * New node file
 */
var http = require("http");
var fs = require("fs");
var urlLib=require("url");

var server = http.createServer(function(request, response) {
	var obj=urlLib.parse(request.url,true);            //使用url模板进行解析,true表示对query内容json化

	var url = obj.pathname;                            //网址
	var Get = obj.query;             //get请求的内容，用json存储中
	
	console.log(url);console.log(Get);


//通过传输的url拼接起网址，将www中的文件返还给用户
	if(url != "/") {
		var file_name = "./www" + request.url;

		fs.readFile(file_name, function(err, data) {
			if(err) {
				response.write("404");
			} else {
				response.write(data);
			}
			response.end();
		});
	} else {
		fs.readFile("./www/index.html", function(err, data) {
			if(err) {
				response.write("404");
			} else {
				response.write("你没有输入网址");
				//response.write(data);
			}
			response.end();
		});
	}
	
});

server.listen(8080);