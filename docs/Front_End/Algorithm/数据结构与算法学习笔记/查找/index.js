
// 二分查找

function binarySearch(targetVal, arr, left, right) {
  let mid = parseInt((left+right) / 2)
  middleVal = arr[mid]
  if(left > right) {
    return -1
  }
  if(middleVal < targetVal) {
    return binarySearch(targetVal, arr, mid + 1, right)
  } else if(middleVal > targetVal) {
    // 向左递归
    return binarySearch(targetVal, arr, left, mid -1)
  } else {
    return mid
  }
}

let arr = [1,2,3,4,5,6,7,8,9,10]

// let index = binarySearch(73, arr, 0, arr.length-1)
// console.log(index)

// 二分查找完善


// 插值查找
function insertValueSearch(arr, left, right, findVal) {
  // 
  if(findVal <arr[0] || findVal > arr[arr.length-1] || left > right) {
    return -1
  }
  // 求出mid
  let mid = left + parseInt((right-left)*(findVal - arr[left])/(arr[right]-arr[left]))
  let midVal = arr[mid]
  if(midVal < findVal) {
    return insertValueSearch(arr, mid+1, right, findVal)
  } else if(midVal > findVal) {
    return insertValueSearch(arr, left, mid-1, findVal)
  } else {
    return mid
  }
}

let index = insertValueSearch(arr, 0, arr.length-1, 7)
console.log(index)