/*
 * @Author: your name
 * @Date: 2020-08-03 19:41:29
 * @LastEditTime: 2020-08-03 19:54:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JDR_Blog\docs\_scripts\mouseEffects.js
 */ 
var idx = 0
var tips = [
  'ECMAscript 🐮', 
  '算法 🐶', 
  'Git 🐱', 
  'Vue 🐯', 
  'React 🐻', 
  'Http 🐷',
  'Node 🐀',
  'TypeScript 🐍',
  '成长 🐱‍🏍',
  '撸铁 🐱‍👤',
  '读书 🤓',
  '交友 👫'
]
$(document).ready(function ($) {
  $('body').click(function (e) {
    var $i = $('<span></span>').text(tips[idx])
    idx = (idx + 1) % tips.length
    var x = e.pageX,
      y = e.pageY
    $i.css({
      'z-index': 10000,
      'top': y - 20,
      'left': x,
      'position': 'absolute',
      'font-weight': 'bold',
      'cursor': 'default',
      'user-select': 'none',
      'color': 'rgb(' + ~~(255 * Math.random()) + ',' + ~~(255 * Math.random()) + ',' + ~~(255 * Math.random()) + ')'
    })
    $('body').append($i)
    $i.animate({
        'top': y - 180,
        'opacity': 0
      },
      1500,
      function () {
        $i.remove()
      })
  })
})