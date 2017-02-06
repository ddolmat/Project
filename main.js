document.addEventListener("DOMContentLoaded", function(){
	init();
});
function init(){
	var navi = document.querySelector(".navi");
	var service = document.querySelector(".service");
	var searchBar = document.querySelector(".search_bar");
	var inputBox = document.querySelector(".search_input");
	navi.addEventListener("click", function(evt){
		if(evt.target.id === "view_more"){
			service.classList.toggle("hidden");
		}
	});
	service.addEventListener("click", function(evt){
		if(evt.target.tagName !== "BUTTON") return;
		if(evt.target.id === "nav_close") {
			service.classList.toggle("hidden");
		}
	});
	inputBox.addEventListener("focus", function(){
		searchBar.classList.toggle("search_on");
		
	});
	inputBox.addEventListener("focusout", function(){
		searchBar.classList.toggle("search_on");
	});
}

