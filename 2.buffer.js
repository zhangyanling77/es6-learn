// 把二进制表现成了10进制 可以和字符串进行转化


// 1）buffer的声明方式 代表的是内存 不可以扩展，固定大小
let buf1 = Buffer.alloc(5) // 申请内存 一定是00 出来的结果像数组
console.log(buf1) // <Buffer 00 00 00 00 00>
let buf2 = Buffer.allocUnsafe(2) // 速度快，随机分配的内存 比如出现这种：<Buffer ff ff> 不安全 allocUnsafe+fill 等价于 alloc 
// buf2.fill(0)
console.log(buf2) // <Buffer 00 00>
let buf3 = Buffer.from('张燕玲') // 很少用
console.log(buf3) // <Buffer e5 bc a0 e7 87 95 e7 8e b2>

// 2）buffer常见方法
// 和数组类似
// 2.1）slice
let arr = [[1,2,3],4,5,6]
let newarr = arr.slice(0) // 浅拷贝
newarr[0][1] = 100
console.log(arr) // [ [ 1, 100, 3 ], 4, 5, 6 ]

// buffer存放的都是内存地址，如果截取某一段 改变的时候也是更改了这个内容
let newbuf3 = buf3.slice(0)
newbuf3[0] = 100
console.log(newbuf3) // <Buffer 64 bc a0 e7 87 95 e7 8e b2>

// 2.2）判断buffer的类型 Buffer.isBuffer():boolean
console.log(Buffer.isBuffer(buf3)) // true

// 2.3）buffer不能扩展大小
// copy 拷贝 
Buffer.prototype.copy = function(targetBuffer, targetStart, sourceStart, sourceEnd){
  // console.log("copy")
  for(let i = 0; i < sourceEnd - sourceStart; i++){
    // 将每次循环出的结果 拷贝到目标buffer
    targetBuffer[targetStart + i] = this[sourceStart + i]
  }
}
// buffer.copy(目标buffer, 目标开始位置, 源的开始, 源的结束)
let buf4 = Buffer.alloc(6) // <Buffer 00 00 00 00 00 00>
let buf5 = Buffer.from('马')
let buf6 = Buffer.from('玲')
// buf5.copy(buf4, 0, 0, 3)
// buf6.copy(buf4, 3, 0, 3)

// console.log(buf4) // <Buffer e9 a9 ac e7 8e b2>

// 2.4）concat 拼接
Buffer.concat = function(list, length = list.reduce((a,b) => a+b.length, 0)){
  let buff = Buffer.alloc(length)
  let offset = 0
  list.forEach(b => {
    b.copy(buff, offset)
    offset += b.length
  })

  return buff
}

let buf7 = Buffer.concat([buf5, buf6])
console.log(buf7)

// 3）扩展buffer的方法
let buf8 = Buffer.from(`春眠不觉晓
处处闻啼鸟
夜来风雨声
花落知多少`)

Buffer.prototype.split = function(sep){ //  sep分隔符
  let len = Buffer.from(sep).length
  let offset = 0
  let result = []
  let current
  // 把找到的位置赋给current 看一下是否位-1
  while((current = this.indexOf(sep, offset)) !== -1){
    result.push(this.slice(offset, current)) // 将每次的结果push到数组中
    offset = current + len // 增加查找的偏移量
  }
  result.push(this.slice(offset)) // 最后一段给追加上
  return result
}

console.log(buf8.split('\n'))
