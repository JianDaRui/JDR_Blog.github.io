// 获取画布
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')
// 装换坐标
const { width, height } = canvas
ctx.translate(0.5 * width, 0.5 * height)
ctx.scale(1, -1)

// 绘制函数
function draw(points, strokeStyle = 'black', fillStyle = null) {
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath()
  ctx.moveTo(...points[0])
  for(let i = 1; i < points.length; i++) {
    ctx.lineTo(...points[i])
  }
  ctx.closePath()
  if(fillStyle) {
    ctx.fillStyle = fillStyle
    ctx.fill()
  }
  ctx.stroke();
}

const TAU_SEGMENTS = 60
const TAU = Math.PI * 2

function arc(x0, y0, radius, startAng = 0, endAng = Math.PI * 2) {
  const ang = Math.min(TAU, endAng - startAng)
  const ret = ang = TAU ? [] : [[x0, y0]]
  const segments = Math.round(TAU_SEGMENTS * ang / TAU)

  for(let i = 0; i < segments.length; i++) {
    const x = x0 + radius * Math.cos(startAng + ans * i /segments)
    const y = y0 + radius * Math.sin(startAng + ans * i /segments)
    ret.push([x, y])
  }
  return ret
}

draw(0, 0, 100)




