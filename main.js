document.addEventListener("DOMContentLoaded", function(){
	init();
});
function init(){
	var navi = document.querySelector(".navi");
	var service = document.querySelector(".service");
	var searchBar = document.querySelector(".search_bar");
	var inputBox = document.querySelector(".search_input");
	var mediaTabWrap = document.querySelector(".mediaTab_wrap");
	var flag = {done:true};
	var mediaTabInfo = setSlidePosition(mediaTabWrap);
	document.addEventListener("transitionend", function(){
		flag.done = true;
	});
	document.addEventListener("click", function(evt){
		if(flag.done === false) return;
		flag.done = false;
		if(evt.target.id === "mediaPrevBtn"){
			var mediaTabX = +mediaTabWrap.style.transform.replace(/translate3d\((-?\d+).+/, "$1");
			moveLeft(mediaTabWrap, mediaTabX, mediaTabInfo);
			return;
		}
		if(evt.target.id === "mediaNextBtn"){
			var mediaTabX = +mediaTabWrap.style.transform.replace(/translate3d\((-?\d+).+/, "$1");
			moveRight(mediaTabWrap, mediaTabX, mediaTabInfo);
			return;
		}
		flag.done = true;
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
function moveLeft(div, x, info){
	if(x === info.width){
		var mod =  - (info.nums - 1) * info.width;
		var mod2 = mod + info.width;
		setTrans(div, mod, "none");
		setTimeout(function(){
			setTrans(div, mod2, "All 0.6s, ease-in-out");
		}, 10);
		return;
	}
	x += info.width;
	setTrans(div, x, "");
	return;
}

function moveRight(div, x, info){
	var a = info.nums * info.width;
	if(x === -a) {
		setTrans(div, 0, "none");
		setTimeout(function(){
			setTrans(div, -info.width, "All 0.6s, ease-in-out");		
		}, 10);
		return;	
		}
	x -= info.width;
	setTrans(div, x, "");
	return;	
}

function setSlidePosition(slideWrap){
	var wrapWidth = parseInt(window.getComputedStyle(slideWrap).width);
	var nums = slideWrap.children.length;
	setTrans(slideWrap, 0, "");
	for(var i = 0; i < nums; i++){
		setTrans(slideWrap.children[i], i*wrapWidth, "");
	}
	insertClone(slideWrap, wrapWidth);
	return {
			width:wrapWidth,
			nums:nums
	};
}
function insertClone(div, width){
	var len = div.children.length;
	var lastClone = div.children[len-1].cloneNode(true);
	var lastX = -width;
	setTrans(lastClone, lastX, "");
	div.insertBefore(lastClone, div.children[0]);
	var firstClone = div.children[1].cloneNode(true);
	var firstX = width * len;
	setTrans(firstClone, firstX, "");
	div.appendChild(firstClone);
}
function setTrans(node, x, tr){
	node.style.transform = "translate3d("+x+"px, 0px, 0px)";
	if(tr === "") return;
	node.style.transition = tr;
}