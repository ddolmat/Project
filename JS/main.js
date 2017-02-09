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

function setSlidePosition(slideWrap){
	var wrapWidth = parseInt(window.getComputedStyle(slideWrap.parentNode).width);
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

function insertClone(slideWrap, width){
	var len = slideWrap.children.length;
	var lastClone = slideWrap.children[len-1].cloneNode(true);
	var lastX = -width;
	setTrans(lastClone, lastX, "");
	slideWrap.insertBefore(lastClone, slideWrap.children[0]);
	var firstClone = slideWrap.children[1].cloneNode(true);
	var firstX = width * len;
	setTrans(firstClone, firstX, "");
	slideWrap.appendChild(firstClone);
}

function setTrans(node, x, tr){
	node.style.transform = "translate3d("+x+"px, 0px, 0px)";
	if(tr === "") return;
	node.style.transition = tr;
}

//prev, next버튼들에 각각 동일한 클래스값을 줘서 if문을 줄일수 있을것같다. classList.contains활용.
function selectAction(id, tabWraps, btnID, tabInfos, flag){
	if(flag.done === false) return;
	flag.done = false;
	var x = {
		media:getX(tabWraps.media),
		fun:getX(tabWraps.fun)
	};
	if(id === btnID.media.prev){
		movePrev(tabWraps.media, x.media, tabInfos.media);
	}else if(id === btnID.media.next){ 
		moveNext(tabWraps.media, x.media, tabInfos.media);
	}else if(id === btnID.fun.prev){ 
		movePrev(tabWraps.fun, x.fun, tabInfos.fun);
	}else if(id === btnID.fun.next){ 
		moveNext(tabWraps.fun, x.fun, tabInfos.fun);
	}else {
		flag.done = true;
		return;
	}
}

function getX(wrap){
	return +wrap.style.transform.replace(/translate3d\((-?\d+).+/, "$1");	
}

function movePrev(slideWrap, x, info){
	if(x === info.width){
		var mod =  - (info.nums - 1) * info.width;
		var mod2 = mod + info.width;
		setTrans(slideWrap, mod, "none");
		setTimeout(function(){
			setTrans(slideWrap, mod2, "All 0.6s, ease-in-out");
		}, 10);
		return;
	}
	x += info.width;
	setTrans(slideWrap, x, "");
	return;
}

function moveNext(slideWrap, x, info){
	var lim = info.nums * info.width;
	if(x === -lim) {
		setTrans(slideWrap, 0, "none");
		setTimeout(function(){
			setTrans(slideWrap, -info.width, "All 0.6s, ease-in-out");		
		}, 10);
		return;	
		}
	x -= info.width;
	setTrans(slideWrap, x, "");
	return;	
}



