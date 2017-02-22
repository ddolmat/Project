document.addEventListener("DOMContentLoaded", function(){
	init();
});

function init(){
	var surl = "http://127.0.0.1:8000/JSON/search.json";
	var navi = document.querySelector(".navi");
	var service = document.querySelector(".service");
	/*
	slideUI를 적용시킬 slideWrap의 클래스에 "slideWrap"을 넣어줘야함 slideWrap에 "#[class]" 클래스를 넣어줘야함
	DOM구조는 <view><wrap><slide1><slide2>...<slideN></wrap></view> 순서임
	view에 over-flow:hidden, slide1~N에 position:absolute 줘야함
	transition값은 css에서 설정한값을 읽어옴. 
	*/
	var slideWraps = slideUI.findSlideWraps();
	//position:absolute인 wrap의 하위 slide의 위치값 설정과 함께 return값으로 width와 slide갯수를 받아옴 + 앞뒤로 클론 생성
	var wrapInfos = slideUI.getWrapInfo(slideWraps);
	/*
	slideUI BUTTON id규칙 
	-slideWrap의 #[class]에 해당하는 [class][Next|Prev]Btn 
	 	ex> slideWrap의 #[class]가 #media인 경우mediaNextBtn mediaPrevBtn
	-클래스에 slide_btn을 넣어줘야함
	*/
	//transitionend를 판별하기위함 call by reference를 위해 오브젝트로 선언
	var flag = {done:true};
	var tags = ["BUTTON", "A", "LI"];
	searchBar.addEvent(surl);
	document.addEventListener("transitionend", function(){
		flag.done = true;
	});
	document.addEventListener("click", function(evt){
		if(!checkTagName(evt.target.tagName, tags)) return;
		else if(evt.target.classList.contains("search_list")) {
			searchBar.inputBox.value = evt.target.innerText;
			searchBar.suggest.classList.add("hidden");
		} 
		else if(evt.target.classList.contains("nav_control")){
			service.classList.toggle("hidden");
			return;
		}else if(evt.target.classList.contains("slide_btn")){
			slideUI.selectAction(evt.target.id, slideWraps, wrapInfos, flag);
		}
	});
	searchBar.focusInOut(searchBar.inputBox, searchBar.searchBar, "search_on");
	slideUI.autoSlide(slideWraps, wrapInfos, 7000);
}

function checkTagName(tagName, allowTags){
	for(var i = 0; i < allowTags.length; i++){
		if(tagName === allowTags[i]) return true;
	}
	return false;
}

