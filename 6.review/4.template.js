// 模板引擎 面试会问如何实现一个模板引擎

// ejs
// npm install ejs
// 常见的模板引擎 ejs jade handlerbar underscore nunjunks {{xxx}}
let fs = require("fs");
let template = fs.readFileSync("./template.html", "utf8");
// 实现模板引擎的原理  正则

function render(templateStr, obj) {
  // {{name}}
  let head = 'let str = "";\r\n';
  head += "with(xxx){\r\n";
  let content = "str += `";  // 取值
  templateStr = templateStr.replace(/\{\{(.+?)\}\}/g, function() {
    return "${" + arguments[1] + "}";
  });
  // 解析语法
  content += templateStr.replace(/\{\%(.+?)\%\}/g, function() {
    return "`\r\n" + arguments[1] + "\r\nstr+=`";
  });
  let tail = "`\r\n}\r\n return str;";
  // 产生函数
  let fn = new Function("xxx", head + content + tail);
  return fn(obj);
  // return templateStr.replace(/\{\{(.+?)\}\}/g,function(){
  //     return obj[arguments[1]]
  // });
}
// 模板引擎的实现原理是: 1) with语法 2） new Function
let r = render(template, { arr: [1, 2, 3] });
console.log(r);
