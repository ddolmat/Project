var slideUI = {
	findSlideWraps:function(){
		var tabWraps = {};
		var wraps = document.querySelectorAll(".slideWrap");
		for(var i = 0; i < wraps.length; i++){
			var objKey = wraps[i].className.replace(/.*\#(\w+\d*).*/, "$1");
			tabWraps[objKey] = wraps[i];
		}
		return tabWraps;
	},
	getTabInfo:function(slideWraps){
		var wrapInfo = {};
		for(var prop in slideWraps){
			wrapInfo[prop] = this.setSlidePosition(slideWraps[prop]);;
		}
		return wrapInfo;
	},
	getBtnID:function(){
		var btns = document.querySelectorAll(".slide_btn");
		var btnID = {Prev:{}, Next:{}};
		for(var i = 0; i < btns.length; i++){
			var firstKey = btns[i].id.replace(/.*(\w{4})Btn/, "$1");
			var secondKey = btns[i].id.replace(/(.*)\w{4}Btn/, "$1");
			btnID[firstKey][secondKey] = btns[i].id;
		}
		return btnID;
	},
	setSlidePosition:function(slideWrap){
		var wrapWidth = parseInt(window.getComputedStyle(slideWrap.parentNode).width);
		var tr = window.getComputedStyle(slideWrap).transition;
		var nums = slideWrap.children.length;
		this.setTrans(slideWrap, 0, "");
		for(var i = 0; i < nums; i++){
			this.setTrans(slideWrap.children[i], i*wrapWidth, "");
		}
		this.insertClone(slideWrap, wrapWidth);
		return {
				tr:tr,
				width:wrapWidth,
				nums:nums
		};
	},
	insertClone:function(slideWrap, width){
		var len = slideWrap.children.length;
		var lastClone = slideWrap.children[len-1].cloneNode(true);
		var lastX = -width;
		this.setTrans(lastClone, lastX, "");
		slideWrap.insertBefore(lastClone, slideWrap.children[0]);
		var firstClone = slideWrap.children[1].cloneNode(true);
		var firstX = width * len;
		this.setTrans(firstClone, firstX, "");
		slideWrap.appendChild(firstClone);
	},
	setTrans:function(node, x, tr){
		node.style.transform = "translate3d("+x+"px, 0px, 0px)";
		if(tr === "") return;
		node.style.transition = tr;
	},
	selectAction:function(id, slideWraps, btnID, wrapInfos, flag){
		if(flag.done === false) return;
		flag.done = false;
		var x = this.getX(slideWraps);
		var index = id.replace(/(.*)\w{4}Btn/, "$1");
		var direction = id.replace(/.*(\w{4})Btn/, "$1");
		if(direction === "Next"){
			this.moveNext(slideWraps[index], x[index], wrapInfos[index]);
		} else if(direction === "Prev") {
			this.movePrev(slideWraps[index], x[index], wrapInfos[index]);
		} else {
			flag.done = true;
			return;
		}
	},
	getX:function(wrap){
		var x = {};
		for(var prop in wrap){
			x[prop] = +wrap[prop].style.transform.replace(/translate3d\((-?\d+).+/, "$1");	
		}
		return x;
	},
	movePrev:function(slideWrap, x, info){
		if(x === info.width){
			var mod =  - (info.nums - 1) * info.width;
			var mod2 = mod + info.width;
			this.setTrans(slideWrap, mod, "none");
			setTimeout(function(){
				slideUI.setTrans(slideWrap, mod2, info.tr);
			}, 10);
			return;
		}
		x += info.width;
		this.setTrans(slideWrap, x, "");
		return;
	},
	moveNext:function(slideWrap, x, info){
		var lim = -(info.nums * info.width);
		if(x === lim) {
			this.setTrans(slideWrap, 0, "none");
			setTimeout(function(){
				slideUI.setTrans(slideWrap, -info.width, info.tr);		
			}, 10);
			return;	
			}
		x -= info.width;
		this.setTrans(slideWrap, x, "");
		return;	
	},
	autoSlide:function(slideWraps, wrapInfos, ms){
		setTimeout(function(){
			for(var props in slideWraps){
				var x = slideUI.getX(slideWraps);
				slideUI.moveNext(slideWraps[props], x[props], wrapInfos[props]);
			}
			slideUI.autoSlide(slideWraps, wrapInfos, ms);
		}, ms);
	}
};

