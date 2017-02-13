function findSlideWraps(){
	var tabWraps = {};
	var wraps = document.querySelectorAll(".slideWrap");
	for(var i = 0; i < wraps.length; i++){
		var objKey = wraps[i].className.replace(/.*\#(\w+\d*).*/, "$1");
		tabWraps[objKey] = wraps[i];
	}
	return tabWraps;
}

function getTabInfo(tabWraps){
	var tabInfo = {};
	for(var prop in tabWraps){
		tabInfo[prop] = setSlidePosition(tabWraps[prop]);;
	}
	return tabInfo;
}

function getBtnID(){
	var btns = document.querySelectorAll(".slide_btn");
	var btnID = {Prev:{}, Next:{}};
	for(var i = 0; i < btns.length; i++){
		var firstKey = btns[i].id.replace(/.*(\w{4})Btn/, "$1");
		var secondKey = btns[i].id.replace(/(.*)\w{4}Btn/, "$1");
		btnID[firstKey][secondKey] = btns[i].id;
	}
	return btnID;
}

function setSlidePosition(slideWrap){
	var wrapWidth = parseInt(window.getComputedStyle(slideWrap.parentNode).width);
	var tr = window.getComputedStyle(slideWrap).transition;
	var nums = slideWrap.children.length;
	setTrans(slideWrap, 0, "");
	for(var i = 0; i < nums; i++){
		setTrans(slideWrap.children[i], i*wrapWidth, "");
	}
	insertClone(slideWrap, wrapWidth);
	return {
			tr:tr,
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

function selectAction(id, tabWraps, btnID, tabInfos, flag){
	if(flag.done === false) return;
	flag.done = false;
	var x = getX(tabWraps);
	var tab = id.replace(/(.*)\w{4}Btn/, "$1");
	var direction = id.replace(/.*(\w{4})Btn/, "$1");
	if(direction === "Next"){
		moveNext(tabWraps[tab], x[tab], tabInfos[tab]);
	} else if(direction === "Prev") {
		movePrev(tabWraps[tab], x[tab], tabInfos[tab]);
	} else {
		flag.done = true;
		return;
	}
}

function getX(wrap){
	var x = {};
	for(var prop in wrap){
		x[prop] = +wrap[prop].style.transform.replace(/translate3d\((-?\d+).+/, "$1");	
	}
	return x;	
}

function movePrev(slideWrap, x, info){
	if(x === info.width){
		var mod =  - (info.nums - 1) * info.width;
		var mod2 = mod + info.width;
		setTrans(slideWrap, mod, "none");
		setTimeout(function(){
			setTrans(slideWrap, mod2, info.tr);
		}, 10);
		return;
	}
	x += info.width;
	setTrans(slideWrap, x, "");
	return;
}

function moveNext(slideWrap, x, info){
	var lim = -(info.nums * info.width);
	if(x === lim) {
		setTrans(slideWrap, 0, "none");
		setTimeout(function(){
			setTrans(slideWrap, -info.width, info.tr);		
		}, 10);
		return;	
		}
	x -= info.width;
	setTrans(slideWrap, x, "");
	return;	
}

