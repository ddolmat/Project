
var searchBar = {
	searchBar:document.querySelector(".search_bar"),
	inputBox:document.querySelector(".search_input"),
	suggest:document.querySelector(".suggest"),

	addEvent:function(url){
		this.inputBox.addEventListener("keyup", function(evt){
			var temp = this.inputBox.value;
			var keyCode = evt.keyCode;
			var sugList = searchBar.suggest.children;
			var lim = sugList.length;
			var selectedIndex = -1;
			for(var i = 0; i < lim; i++){
				if(sugList[i].classList.contains("selected")) {
					selectedIndex = i;
					break;
				}
			}
			if(keyCode === 40) {
				if(lim === 0) return;
				else if(selectedIndex === -1) {
					sugList[0].classList.toggle("selected");
					searchBar.inputBox.value = sugList[0].textContent;
					return;			
				} else {
					sugList[selectedIndex].classList.toggle("selected");
					selectedIndex += 1;
					if(selectedIndex === lim){
						selectedIndex = 0;
					} 
					searchBar.inputBox.value = sugList[selectedIndex].textContent;
					sugList[selectedIndex].classList.toggle("selected");
				}
			} else if(keyCode === 38) {
				if(selectedIndex === -1 || lim === 0) return;
				else {
					if(selectedIndex === 0) {
						if(lim === 1) return;
						sugList[selectedIndex].classList.toggle("selected");
						selectedIndex = lim - 1;
					} else {
						sugList[selectedIndex].classList.toggle("selected");
						selectedIndex -= 1;
					}
					searchBar.inputBox.value = sugList[selectedIndex].textContent;
					sugList[selectedIndex].classList.toggle("selected");
				}
			} else {
				ajax.sendAjax(url, function(){
					var datalist = JSON.parse(this.responseText);
					var str = "";
					if( temp === "") {
						searchBar.suggest.innerHTML = "";
						searchBar.suggest.classList.add("hidden");
						return;
					} 
					var cnt = 0;
					for(var idx in datalist){
						if(datalist[idx].includes(temp)){
							str += "<li class='search_list'>"+datalist[idx]+"</li>";
							cnt++;
						}
					}
					if(cnt === 0) return;
					var findTmp = new RegExp(temp, 'g');
					var redText = "<font color='red'>"+temp+"</font>";
					str = str.replace(findTmp, redText);
					searchBar.suggest.innerHTML = str;
					searchBar.suggest.classList.remove("hidden");
				});
			}
		}.bind(this));	
	},

	focusInOut:function(evtEle, targetEle ,toggleClass){
		evtEle.addEventListener("focus", function(){
			targetEle.classList.toggle(toggleClass);	
		});
		evtEle.addEventListener("focusout", function(){
			targetEle.classList.toggle(toggleClass);
		});
	}
}
