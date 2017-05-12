/**
 * New node file
 */
const fs=require('fs');

fs.rename('./www/data/b.txt','./www/data/a.txt',function(err){
	console.log(err);
})
