/**
 * New node file
 */
const path=require('path');
var str="./www/data/ass.txt"
var obj=path.parse(str);
//name   文件名，不包括扩展名     'ass'
//base   文件名，包括扩展名         'ass.txt'
//dir    文件路径                            './www/data'
//ext    文件类型                            '.txt'
console.log(obj)
