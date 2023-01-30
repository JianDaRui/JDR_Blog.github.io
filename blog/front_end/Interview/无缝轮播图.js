(function () {
  let prev = document.getElementsByClassName("carousel-prev")[0];
  let next = document.getElementsByClassName("carousel-next")[0];
  let board = document.getElementsByClassName("carousel-board")[0];
  let panels = Array.from(document.getElementsByClassName('carousel-board-item'));
  board.style.left = "-400px"; //设置初始的left值
  let index = 1; //设置初始的index值
  prev.addEventListener("click", function () {
      index++
      console.log(index);
      animate(-400);
      //关键点 如果当前在 1fake 的位置
      if (index === panels.length - 1) {
          setTimeout(() => {
              //去掉动画
              board.style.transition = "0s";
              let distance = 4 * 400
              //默默的左移board至 1
              board.style.left = parseInt(board.style.left) + distance + "px"
          }, 600)
          index = 1;
      }

  })
  next.addEventListener("click", () => {
      index--
      console.log(index);
      animate(400);
      //关键点 如果当前在 4fake 的位置
      if (index === 0) {
          setTimeout(() => {
              // 去掉动画
              board.style.transition = "0s";
              let distance = -4 * 400
              //默默的右移board 至 4
              board.style.left = parseInt(board.style.left) + distance + "px"
          }, 600)
          index = 4;
      }
  })

  function animate(width = 400) {
      board.style.transition = "0.5s";
      board.style.left || (board.style.left = 0)
      board.style.left = parseInt(board.style.left) + width + "px";
  }
})()
