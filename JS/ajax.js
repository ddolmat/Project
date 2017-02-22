var ajax = {
	sendAjax: function(url, func){
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", func);
		oReq.open("GET", url);
		oReq.send();
	}
};