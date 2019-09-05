const fs = require('fs')
const path = require('path')

let r = fs.readFileSync(path.resolve(__dirname, 'node.md'))

// 默认文件的读取操作，读出来都是buffer
// 内存表示方式就是buffer 内存二进制 十六进制（buffer用的是这个进制） 八进制 十进制
console.log(Buffer.from(r).toString()) 

console.log(Buffer.from('张'))  // <Buffer e5 bc a0> base64编码：5byg
console.log(Buffer.from('燕'))  // <Buffer e7 87 95> base64编码：54eV
console.log(Buffer.from('玲'))  // <Buffer e7 8e b2> base64编码：546y
console.log(0xe5.toString(2)) // 11100101
console.log(0xbc.toString(2)) // 10111100
console.log(0xa0.toString(2)) // 10100000

// 3个8位转四个6位 =》 base64的原理
// 11100101 10111100 10100000
// 111001 011011 110010 100000


let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str += str.toLowerCase()
str += '0123456789+/'

let result = str[0b111001] + str[0b011011] + str[0b110010] + str[0b100000]
console.log(result) // 5byg

console.log(Buffer.from('张燕玲').toString('base64')) // 5byg54eV546y toString中的默认编码是utf-8

// 研究 unicode => utf-8
// 进制转化的bug
