# 剑指Offer算法学习
- 判断一个数是否在一个二维数组中存在
```javascript
let arr = [ [1, 2, 8, 9], [2, 4, 9, 12], [4, 7, 10, 13], [6, 8, 11, 15] ]
let num = 7

var findNumber = function(matrix,target){
    if(matrix.length == 0){
      return false
    }
    let x = 0
    let y = matrix.length - 1;//这里y是行数，x是列数
    
    //设置越界条件 终止条件
    while(x<matrix[0].length && y>=0){
        if(matrix[y][x] > target){
            y--
        }else if(matrix[y][x] < target){
            x++
        }else{
            return true,[y+1,x+1]
        }
    }
    return false
}
console.log()
```