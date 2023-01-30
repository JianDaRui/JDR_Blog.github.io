// 冒泡排序
var arr = [3, 1, 4, 6, 5, 7, 2];

function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    console.log(arr);
}

// 改进冒泡排序
function bubbleSort1(arr) {
    let i = arr.length - 1;

    while (i > 0) {
        let pos = 0;
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                pos = j;
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        i = pos;
    }
    console.log(arr);
}
console.log(bubbleSort(arr));

// 快速排序

var arr = [3, 1, 4, 6, 5, 7, 2];
function quickSort(arr) {
  if (arr.length == 0) {
    return []; // 返回空数组
  }

  var cIndex = Math.floor(arr.length / 2);
  var c = arr.splice(cIndex, 1);
  var l = [];
  var r = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < c) {
      l.push(arr[i]);
    } else {
      r.push(arr[i]);
    }
  }

  return quickSort(l).concat(c, quickSort(r));
}

console.log(quickSort(arr));

// 插入排序
var a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221];
function insertSort(array) {
  const len = array.length;
  let current;
  let prev;
  for (let i = 1; i < len; i++) {
    current = array[i];
    prev = i - 1;
    while (prev >= 0 && array[prev] > current) {
      array[prev + 1] = array[prev];
      prev--;
    }
    array[prev + 1] = current;
  }
  return array;
}
insertSort(a); // [1, 1, 3, 3, 6, 6, 23, 34, 76, 221, 222, 456]

// 选择排序
var a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221];
function selectSort(array) {
  const len = array.length;
  let temp;
  let minIndex;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (array[j] <= array[minIndex]) {
        minIndex = j;
      }
    }
    temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }
  return array;
}
selectSort(a); // [1, 1, 3, 3, 6, 6, 23, 34, 76, 221, 222, 456]

// 堆排序
var a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221];
function heap_sort(arr) {
  var len = arr.length
  var k = 0
  function swap(i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  function max_heapify(start, end) {
    var dad = start
    var son = dad * 2 + 1
    if (son >= end) return
    if (son + 1 < end && arr[son] < arr[son + 1]) {
      son++
    }
    if (arr[dad] <= arr[son]) {
      swap(dad, son)
      max_heapify(son, end)
    }
  }
  for (var i = Math.floor(len / 2) - 1; i >= 0; i--) {
    max_heapify(i, len)
  }
   
  for (var j = len - 1; j > k; j--) {
    swap(0, j)
    max_heapify(0, j)
  }
  
  return arr
}
heap_sort(a); // [1, 1, 3, 3, 6, 6, 23, 34, 76, 221, 222, 456]

// 归并排序
var a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221];
function mergeSort(array) {
  const merge = (right, left) => {
    const result = [];
    let il = 0;
    let ir = 0;
    while (il < left.length && ir < right.length) {
      if (left[il] < right[ir]) {
        result.push(left[il++]);
      } else {
        result.push(right[ir++]);
      }
    }
    while (il < left.length) {
      result.push(left[il++]);
    }
    while (ir < right.length) {
      result.push(right[ir++]);
    }
    return result;
  };

  const mergeSort = (array) => {
    if (array.length === 1) {
      return array;
    }
    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid, array.length);
    return merge(mergeSort(left), mergeSort(right));
  };
  return mergeSort(array);
}
mergeSort(a); // [1, 1, 3, 3, 6, 6, 23, 34, 76, 221, 222, 456]


// 堆 堆排序 堆化

class Heap {
  const { floor } = Math
  construstor(n) {
    this.a = []
    this.n = n
    this.count = 0
  }

  heap(capacity) {
    this.a = new Array(capacity)
    this.n = capacity
  }

  insert(data) {
    if(this.count >= this.n) return
    this.count += 1
    a[count] = data
    while(floor(i/2) > 0 && a[i] > a[floor(i/2)]) {
      [a[i], a[floor(i/2)]] = [a[floor(i/2)], a[i]]
      i = floor(i/2)
    }
  }

  remove() {
    if(this.count === 0) return -1
    a[1] = a[count]
    heapify(this.a, this.count, 1)
  }
  // 自上往下堆化
  heapify(a, n, i) {
    while(true) {
      let maxPos = i
      if(i * 2 <= n && a[i] < a[i * 2]) maxPos = i * 2
      if(i * 2 + 1 <=n && a[maxPos] < a[i * 2 + 1]) maxPos = i * 2 + 1
      if(maxPos === i) break
      swap(a, i, maxPos)
      i = maxPos
    }
  }

  buildHeap(a, n) {
    if(let i = n/2; i >= 0; i--) {
      heapify(a, n, i)
    }
  }

  heapify(a, n, i) {
    while(true) {
      let maxPos = i
      if(i*2 <= n && a[i] < a[i * 2]) maxPos = i * 2
      if(i*2 + 1 <= n && a[maxPos] < a[i*2 + 1]) maxPos = i*2 + 1
      if(maxPos === i) break
      swap(a, i, maxPos)
      i = maxPos
    }
  }
  sort(a, n) {
    buildHeap(a, n)
    let k = n
    while(k > 1) {
      swap(a, 1, k)
      --k
      heapify(a, k, 1)
    }
  }
}
