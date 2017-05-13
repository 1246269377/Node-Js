/**
 * New node file
 */
const express=require('express');
const bodyParser=require('body-parser');
const multer=require('multer');
const fs=require('fs');
const path=require('path');

var objMulter=multer({dest:'./www/data'});
var server=express();
server.listen(8080);

//错误
//server.use(bodyParser.urlencoded({extended:false}));
server.use(objMulter.any());

server.post('/',function(req,res){
	//新文件名
	//'./www/data/???'+'.png/.jsp/...'
	
	var newName=req.files[0].path+path.parse(req.files[0].originalname).ext
	fs.rename(req.files[0].path,newName,function(err){
		if (err) {
			res.send('上传失败');
		} else{
			res.send('上传成功');
		}
		res.end();
	})
	console.log(newName);
})

