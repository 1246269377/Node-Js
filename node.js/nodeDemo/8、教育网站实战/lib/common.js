function toDou(n){
	return n<10?'0'+n:n;
}

module.exports={
	changeTime:function(timeSecond){
		var oDate=new Date();
		oDate.setTime(timeSecond*1000);
		
		return oDate.getFullYear()+"-"+toDou(oDate.getMonth()+1)+"-"+
		toDou(oDate.getDate())+" "+toDou(oDate.getHours())+":"+
		toDou(oDate.getMinutes())+":"+toDou(oDate.getSeconds());
	},
	changeContent:function(content){
		return content.replace(/^/gm,'<p>').replace(/$/gm,'</p>');
	}
}
