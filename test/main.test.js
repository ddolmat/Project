var assert = chai.assert;

describe('test findSlideWrap', function(){
	it('a', function(){
		var a = slideUI.findSlideWraps();
		var check = {
			test1:document.querySelector(".test1Wrap"),
			test2:document.querySelector(".test2Wrap")
		};
		assert.deepEqual(a, check);
	});
});
describe('test getBtnID', function(){
	it('a', function(){
		var a = slideUI.getBtnID();
		var check = {
			Prev:{
				test1:"test1PrevBtn",
				test2:"test2PrevBtn"
			},
			Next:{
				test1:"test1NextBtn",
				test2:"test2NextBtn"
			}
		};
		assert.deepEqual(a, check);
	});
});
describe('test getX', function(){
	it('', function(){
		var a = slideUI.findSlideWraps();
		var b = slideUI.getX(a);
		var check = {
			test1:0,
			test2:0
		};
		assert.deepEqual(b, check);
	});
});
describe('test insertClone', function(){
	it('a', function(){
		var a = document.querySelector(".test2Wrap");
		slideUI.insertClone(a);
		assert.equal(a.children.length, 5);
		a.removeChild(a.firstElementChild);
		a.removeChild(a.lastElementChild);
	});
});
describe('test setSlidePosition', function(){
	it('', function(){
		var a = document.querySelector(".test2Wrap");
		var b = slideUI.setSlidePosition(a);
		var check = {
			tr:window.getComputedStyle(a).transition,
			width:200,
			nums:3
		};
		var c = +a.firstElementChild.style.transform.replace(/translate3d\((-?\d+).+/, "$1");
		var d = +a.lastElementChild.style.transform.replace(/translate3d\((-?\d+).+/, "$1");
		assert.equal(c, -200);
		assert.equal(d, 600);
		assert.deepEqual(b, check);
		a.removeChild(a.firstElementChild);
		a.removeChild(a.lastElementChild);
	});
});
describe('test getWrapInfo', function(){
	it('b', function(){
		var a = slideUI.findSlideWraps();
		var b = slideUI.getWrapInfo(a);
		var check = {
			test1:{
				tr:window.getComputedStyle(a.test1).transition,
				width:300,
				nums:5
			},
			test2:{
				tr:window.getComputedStyle(a.test2).transition,
				width:200,
				nums:3
			}
		};
		assert.deepEqual(b, check);
	});
});
describe('test setTrans', function(){
	it('', function(){
		var a = document.querySelector(".test1Wrap");
		var temp = a.style.transition;
		slideUI.setTrans(a, 200, "none");
		var check1 = +a.style.transform.replace(/translate3d\((-?\d+).+/, "$1");
		var check2 = a.style.transition;
		assert.equal(check1, 200);
		assert.equal(check2, "none");
		slideUI.setTrans(a, 0, temp);
	});
});
/*
describe('test movePrev', function(){
	it('', function(){
		var a = document.querySelector(".test1Wrap");
		slideUI.movePrev()	
	});
});
describe('test movePrev', function(){
	it('', function(){
		
	});
});
*/