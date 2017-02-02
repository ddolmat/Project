document.addEventListener("DOMContentLoaded", function(){
	init();
});
function init(){
	var navi = document.querySelector(".navi");
	var service = document.querySelector(".service");
	navi.addEventListener("click", function(evt){
		if(evt.target.id === "view_more"){
			service.classList.toggle("hidden");
		}
	});
}

