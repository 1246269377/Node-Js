/**
 * New node file
 */
var http = require("http");
var querystring = require("querystring");

http.createServer(function(request, response) {
	//POST--req
	
	var str="";
	var now=1;
	
	//data-----有一段数据到达（会发生很多次）
	request.on("data",function(data){
		console.log('第'+now+'次收到数据');
		now++;
		str+=data;
		//console.log(str);
	});
	
	//end-----数据全部到达（只有一次）
	request.on("end",function(){
		var POST=querystring.parse(str);
		console.log(POST);
		response.end();
	});
}).listen(8080);