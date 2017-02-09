document.addEventListener("DOMContentLoaded", function(){
	init();
});

function init(){
	var navi = document.querySelector(".navi");
	var service = document.querySelector(".service");
	var searchBar = document.querySelector(".search_bar");
	var inputBox = document.querySelector(".search_input");
	var tabWraps = {
		media:document.querySelector(".mediaTab_wrap"),
		fun:document.querySelector(".funGrpTab_wrap")	
	};
	//position:absolute인 wrap의 하위 slide의 위치값 설정과 함께 return값으로 width와 slide갯수를 받아옴 + 앞뒤로 클론 생성
	var tabInfos = { 
		media:setSlidePosition(tabWraps.media),
		fun:setSlidePosition(tabWraps.fun)
	};
	var btnID = {
		media:{
			prev:"mediaPrevBtn",
			next:"mediaNextBtn"
		},
		fun:{
			prev:"funGrpPrevBtn",
			next:"funGrpNextBtn"
		}
	};
	//transitionend를 판별하기위함 call by reference를 위해 오브젝트로 선언
	var flag = {done:true};

	document.addEventListener("transitionend", function(){
		flag.done = true;
	});
	document.addEventListener("click", function(evt){
		selectAction(evt.target.id, tabWraps, btnID, tabInfos, flag);
		if(evt.target.id === "view_more"){
			service.classList.toggle("hidden");
			return;
		}
		if(evt.target.id === "nav_close") {
			service.classList.toggle("hidden");
			return;
		}
	});
	inputBox.addEventListener("focus", function(){
		searchBar.classList.toggle("search_on");	
	});
	inputBox.addEventListener("focusout", function(){
		searchBar.classList.toggle("search_on");
	});
}





