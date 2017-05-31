document.addEventListener("DOMContentLoaded", function(){
	init();
});

function init(){
	/*
	slideUI를 적용시킬 slideWrap의 클래스에 "slideWrap"을 넣어줘야함 slideWrap에 "#[class]" 클래스를 넣어줘야함
	DOM구조는 <view><wrap><slide1><slide2>...<slideN></wrap></view> 순서임
	view에 over-flow:hidden, slide1~N에 position:absolute 줘야함
	transition값은 css에서 설정한값을 읽어옴. 
	*/
	var slideWraps = slideUI.findSlideWraps();
	var wrapInfos = slideUI.getWrapInfo(slideWraps);
	var flag = {done:true};
	var tags = ["BUTTON"];

	document.addEventListener("transitionend", function(){
		flag.done = true;
	});
	document.addEventListener("click", function(evt){
		if(!checkTagName(evt.target.tagName, tags)) return;
		else slideUI.selectAction(evt.target.id, slideWraps, wrapInfos, flag);
	});
	slideUI.autoSlide(slideWraps, wrapInfos, 7000);
}

function checkTagName(tagName, allowTags){
	for(var i = 0; i < allowTags.length; i++){
		if(tagName === allowTags[i]) return true;
	}
	return false;
}

