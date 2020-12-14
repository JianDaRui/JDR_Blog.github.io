// Queue
function Queue(maxSize) {
  let maxSize = maxSize
  let queue = new Array(maxSize)
}
// 入队
Queue.prototype.enqueue = function(element) {
  if(this.isFull()) {
    return console.log("队列已满")
  }
	this.queue.push(element);
};
// 出队
Queue.prototype.dequeue = function() {
  if(this.isEmpty()) {
    return console.log("队列为空")
  }
  return this.queue.shift();
};
// 头部
Queue.prototype.front = function() {
  if(this.isEmpty()) {
    return console.log("队列为空")
  }
  return this.queue[0];
};
// 是否为空
Queue.prototype.isEmpty = function() {
	return this.queue.length === 0;
};
// 是否满了
Queue.prototype.isFull = function() {
	return this.queue.length === this.maxSize;
};
Queue.prototype.size = function() {
  return this.queue.length;
};

// MinPriorityQueue 
function MinPriorityQueue (maxSize) {
  let maxSize = maxSize
  let queue = new Array(maxSize)
}

// 寄生组合式继承的核心方法
function inherit(child, parent) {
    child.prototype = Object.create(parent.prototype, {
  		constructor: {
    		value: child,
   	 		enumerable: false,
        	writable: false,
    		configurable: false
  		}
	})
}

// 实现原型上的方法
inherit(MinPriorityQueue, Queue)
// 入队
MinPriorityQueue.prototype.enqueue = function(element, priority) {
  var queueElement = {
    element: element,
    priority: priority
  };

  if (this.isEmpty()) {
    this.queue.push(queueElement);
  } else {
    var added = false;

    for (var i = 0; i < this.size(); i++) {
        // 找位置
      if (queueElement.priority < this.queue[i].priority) {
        this.queue.splice(i, 0, queueElement);
        added = true;
        break ;
      }
    }

    if (!added) {
      this.queue.push(queueElement);
    }
  }
};


// 最大优先队列MaxPriorityQueue类
function MaxPriorityQueue () {
  let maxSize = maxSize
  let queue = new Array(maxSize)
}

inherit(MaxPriorityQueue, Queue)
// 优先队列添加元素，要根据优先级判断在队列中的插入顺序
MaxPriorityQueue.prototype.enqueue =function(element, priority) {
  var queueElement = {
    element: element,
    priority: priority
  };

  if (this.isEmpty()) {
    this.queue.push(queueElement);
  } else {
    var added = false;

    for (var i = 0; i < this.queue.length; i++) {
      // 注意，只需要将这里改为大于号就可以了
      if (queueElement.priority > this.queue[i].priority) {
        this.queue.splice(i, 0, queueElement);
        added = true;
        break ;
      }
    }

    if (!added) {
      this.queue.push(queueElement);
    }
  }
}
