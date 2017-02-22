function swap(arr, idx1, idx2){
	var temp = arr[idx1];
	arr[idx1] = arr[idx2];
	arr[idx2] = temp;
}

function sort(arr){
	for(var n = arr.length; n >=0; n--){
		for(var i = 0; i < n-1; i++){
			if(arr[i] > arr[i+1]) swap(arr, i, i+1);
		}
	}
}

var arr = [1,3,5,7,9,33,22,11];

function partition(arr, left, right, pivot){
	let pv = arr[pivot];
	swap(arr, pivot, right);
	var storeIndex = left;
	for(var i = left; i <= right-1; i++){
		if(arr[i] <= pv){
			swap(arr, storeIndex, i);
			storeIndex++;
		}
	}
	swap(arr, right, storeIndex);
	console.log(storeIndex);
	return storeIndex;
}

partition(arr, 0, arr.length-1, 2);
console.log(arr);