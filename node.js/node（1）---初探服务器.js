/**
 * New node file
 */
var http = require("http");
var fs = require("fs");
var querystring = require("querystring");

var server = http.createServer(function(request, response) {
	var Get = {};

	var arr = request.url.split("?");
	var url = arr[0];                            //网址
	Get = querystring.parse(arr[1]);             //get请求的内容，用json存储中

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