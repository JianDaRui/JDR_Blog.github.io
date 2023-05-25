// 基数排序

function radixSort(arr) {
  // a.定义桶：桶是一个二维数组
  // b.每个桶是一个一维数组
  // c.为了保证每个桶不会溢出，设置其长度为arr.length
  let bucket = new Array(10).fill([])
  let maxVal = Math.max(...arr)
  let maxLength = new String(maxVal).length
  let bucketElementCounts = new Array(10)

  for(let i=0, n=1; i<maxLength; i++, n *= 10) {

    for(let j=0; j<arr.length; j++) {

      let digitOfElement = (parseInt(arr[j]/n))%10
      console.log(digitOfElement)
      bucket[digitOfElement[bucketElementCounts[digitOfElement]]] = arr[j]

      bucketElementCounts[digitOfElement]++
    }

    let index = 0
    console.log(bucket)
    for(let k = 0; k<bucketElementCounts.length; k++) {
      if(bucketElementCounts[k]) {

        for(let l=0;l<bucketElementCounts[k]; l++) {

          arr[index++] = bucket[k][l]
        }
      }
      bucketElementCounts[k] = 0
    }
  }
  console.log(arr)
}

radixSort([1, 23, 344, 9993, 0, 3, 545 ,456, 2344])