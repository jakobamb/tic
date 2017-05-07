//
//File with utility functions
//

//returns the index of the maximal value in a given array
function getMaxIndex(arr) {
    var max_index = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > arr[max_index]) {
            max_index = i;
        }
    }
    return max_index;
}

//returns the index of the minimum value in a given array
function getMinIndex(arr) {
    var min_index = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < arr[min_index]) {
            min_index = i;
        }
    }
    return min_index;
}
