/**
 * New node file
 */
const mysql=require('mysql');

//1.连接
//createConnection(哪台服务器,端口,用户名,密码,库)
var db=mysql.createConnection({host:'localhost',port:3306,user:'root',password:'',database:'demo-blog'})

//2.查询
//query(干啥,回调函数)
db.query("SELECT * FROM user_table;",(err,data)=>{
	if (err) {
		console.log("出错"+err);
	} else{
		console.log("成功"+data[0].password);
	}
});
