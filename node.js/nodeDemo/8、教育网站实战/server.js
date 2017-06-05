/**
 * New node file
 */
const express = require('express'); //express基础框架
const static = require('express-static'); //文件读取模块
const cookieParser = require('cookie-parser'); //cookie操作模块
const cookieSession = require('cookie-session'); //session操作模块
const bodyParser = require('body-parser'); //post数据解析模块
const multer = require('multer'); //post文件解析模块
const consolidate = require('consolidate'); //模板引擎整合库
const mysql = require('mysql'); //mysql数据库

const commonJs = require('./lib/common'); //自定义的函数库

//连接池
const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'blog'
});

var server = express();
server.listen(8080);

//1.解析cookie
server.use(cookieParser('asdjhwu2y3f8y83efgt44'));

//2.session加密以及命名设置
var arr = [];
for(var i = 0; i < 100000; i++) {
	arr.push("xime_" + Math.random());
}
server.use(cookieSession({
	name: 'sess',
	keys: arr,
	maxAge: 30 * 60 * 1000
}));

//3.post数据
server.use(bodyParser.urlencoded({
	extended: false
}));
server.use(multer({
	dest: './www/data'
}).any());

//4.配置模板引擎
//输出什么东西（html/xml/pdf/excl...）
server.set('view engine', 'html');
//模板文件所在位置
server.set('views', './template');
//哪种模板引擎
server.engine('html', consolidate.ejs);

//5、接受用户请求
server.get('/', function(req, res) {
	//查询banner的东西
	db.query("SELECT * FROM banner_table", function(err, data) {
		if(err) {
			console.log(err);
			res.status(500).send('database error').end();
		} else {
			//查询文章列表信息
			db.query("SELECT ID,title,summary FROM article_table", function(err, data2) {
				if(err) {
					console.log(err);
					res.status(500).send('database error').end();
				} else {
					console.log(data2);
					res.render('index.ejs', {
						banners: data,
						articles: data2
					});
				}
			})
		}
	});
});

server.get('/article', (req, res) => {
	if(req.query.id) {
		db.query("SELECT * FROM article_table where id=" + req.query.id, (err, data) => {
			if(err) {
				res.status(500).send('文章数据未查询到').end();
			} else {
				if(data.length == 0) {
					res.status(404).send('没有这篇文章').end();
				} else {
					if(req.query.act == 'like') {
						db.query("UPDATE article_table SET n_like=n_like+1 where id=" + req.query.id, (err, data1) => {
							if(err) {
								res.status(500).send('数据库出现问题1').end();
								console.log(err);
							} else {
								data[0].post_time = commonJs.changeTime(data[0].post_time);
								data[0].content = commonJs.changeContent(data[0].content);
								res.render('conText.ejs', {
									articles: data[0]
								});
							}
						});
					} else {
						data[0].post_time = commonJs.changeTime(data[0].post_time);
						data[0].content = commonJs.changeContent(data[0].content);
						res.render('conText.ejs', {
							articles: data[0]
						});
					}

				}
			}
		});
	} else {
		res.status(500).send('您请求的文章不存在').end();
	}
});

//6.static数据
server.use(static('./www'));