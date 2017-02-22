var slideUI = {
	/*
	slideWrap class를 가진 엘리먼트들을 찾아 #[class]의 class를 키로 하여
	각 slideWrap들의 참조를 반환
	*/
	findSlideWraps:function(){
		var tabWraps = {};
		var wraps = document.querySelectorAll(".slideWrap");
		for(var i = 0; i < wraps.length; i++){
			var objKey = wraps[i].className.replace(/.*\#(\w+\d*).*/, "$1");
			tabWraps[objKey] = wraps[i];
		}
		return tabWraps;
	},
	/*
	findSlideWraps에서 return한 오브젝트를 매개변수로 받아 각 키값에 해당하는 참조마다 
	setSlidePosition에 매개변수로 넣어 반환 
	*/
	getWrapInfo:function(slideWraps){
		var wrapInfo = {};
		for(var prop in slideWraps){
			wrapInfo[prop] = this.setSlidePosition(slideWraps[prop]);;
		}
		return wrapInfo;
	},
	/*
	slide_btn class를 가진 엘리먼트를 찾아 id값에 따라 각각 하위오브젝트인 Prev와 Next에입력하여 반환
	Prev와 Next의 하위 키값은 각slideWrap 의 #[class]의 class와 매칭되는 값임(마크업시 그렇게 해야함)
	각 버튼의 아이디는 [class][Next|Prev]Btn 식으로 정해야함
	*/
	//필요할것같아서 만들었는데 알고보니 쓰이지않음.....;;
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
	/*
	각 slideWrap의 부모(overflow:hidden값을 가진 slideView노드)의 width값과
	slideWrap하위의 slide갯수와 slideWrap의 transition값을 반환하고
	slide들의 translate3d의 x좌표값을 첫줄에서 얻은 width값을 기준으로 설정후
	1번앞에 마지막의 클론을 마지막뒤에 1번의 클론을 넣어줌
	*/
	setSlidePosition:function(slideWrap){
		var wrapWidth = parseInt(window.getComputedStyle(slideWrap.parentNode).width);
		var tr = window.getComputedStyle(slideWrap).transition;
		var nums = slideWrap.children.length;
		this.setTrans(slideWrap, 0, "");
		for(var i = 0; i < nums; i++){
			this.setTrans(slideWrap.children[i], i*wrapWidth, "");
		}
		var info = {
			tr:tr,
			width:wrapWidth,
			nums:nums
		};
		this.insertClone(slideWrap, wrapWidth);
		return info;
	},
	//slideWrap의 앞뒤로 클론삽입 setSlidePosition에서 호출되어 사용됨
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
	//노드의 translated3d 의 x값과 transition값을 조정 transition값을 ""로 넣으면 전자만 조정
	setTrans:function(node, x, tr){
		node.style.transform = "translate3d("+x+"px, 0px, 0px)";
		if(tr === "") return;
		node.style.transition = tr;
	},
	/*
	클릭 이벤트함수에 넣어서 사용. slideWrap의 현재 translate3d X값을 읽어와서 
	입력받은 변수들과 대조하여 moveNext나 movePrev함수를 발동시킴 
	transitionend 이벤트와 연동되는 flag	값을바꿈
	*/
	selectAction:function(id, slideWraps, wrapInfos, flag){
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
	//노드의 translate3d X값을 반환
	getX:function(wrap){
		var x = {};
		for(var prop in wrap){
			x[prop] = +wrap[prop].style.transform.replace(/translate3d\((-?\d+).+/, "$1");	
		}
		return x;
	},
	//slideWrap을 왼쪽으로 이동시킴. 클론된 마지막노드에서 작동할경우 
	movePrev:function(slideWrap, x, info){
		if(x === info.width){
			var mod =  - (info.nums - 1) * info.width;
			var mod2 = mod + info.width;
			this.setTrans(slideWrap, mod, "none");
			setTimeout(function(){
				this.setTrans(slideWrap, mod2, info.tr);
			}.bind(this), 10);
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
				this.setTrans(slideWrap, -info.width, info.tr);		
			}.bind(this), 10);
			return;	
			}
		x -= info.width;
		this.setTrans(slideWrap, x, "");
		return;	
	},
	autoSlide:function(slideWraps, wrapInfos, ms){
		setTimeout(function(){
			for(var props in slideWraps){
				var x = this.getX(slideWraps);
				this.moveNext(slideWraps[props], x[props], wrapInfos[props]);
			}
			this.autoSlide(slideWraps, wrapInfos, ms);
		}.bind(this), ms);
	}
};

