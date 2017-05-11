/**
 * New node file
 */
const ejs=require('ejs');

ejs.renderFile('./1.ejs',{name:'xiao',json:{
	arr:[{name:'12'},{name:'23'},{name:'34'}]
}},function(err,data){
	console.log(data);
})
