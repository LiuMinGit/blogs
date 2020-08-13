---
title: ES6
---

## var let const 区别
1. var在js中是支持预解析的，而let不支持预解析，也就是变量提升的区别
2. var可以重复定义同一个变量，但是let不可以
3. var没有块级作用域,let有块级作用域
4. const跟以上三点的let一样,唯一区别是const是用来定义常量的，常量定义之后是不允许改变的



## this指向
### 普通this
>四种指向
- 普通函数调用 => window
- 对象调用 => 当前对象
- 构造函数调用 => 创建出来的实例
- apply和call调用 => 方法后的第一参数对象


### 箭头函数
- 它指向的是上层作用域中的this
> 简写依据
1. function不写,改成=>
2. 如果形参只有一个,可以省略小括号
3. 如果形参0个或者多个,不能省略小括号
4. 如果函数体只有一句话,是可以省略大括号的
5. 如果函数体只有一句话,并且是返回值的那一句话,在省略的同时也要省略return
6. 如果函数体不止一句话,就不能省略大括号


## ES6模块化导入、导出语法 
#### Node.js中的模块化标准是CommonJS
- 导入: require
- 暴露: module.exports

#### ES6的模块化语法
> ES6默认语法
- 导入: import xxx from '模块'
- 导出(暴露): export default 名字

> 按名字导入导出
- 导入: import {名字} from '模块'
- 导出: export const 名字 = 值
::: tip 提示
- 导出时必须要赋值
- 你导出的名字叫什么，导入的时候取的时候也要叫什么，名字跟导出的不匹配，就得到undefined
- 在按名字导出的模块里，也可以再用默认导出，用什么方式导出的就要用对应的方式导入
- 导入的时候 import {} 加了大括号，都是按名字找用名字导出的, 不加{}都是找默认导出
- 按名字导入，名字必须跟导出的一样， 默认导入随便写名字
:::


## 防抖节流
> 在进行窗口的resize、scroll，输入框内容校验等操作时，如果事件处理函数调用的频率无限制，会加重浏览器的负担，导致用户体验非常糟糕。此时我们可以采用debounce（防抖）和throttle（节流）的方式来减少调用频率，同时又不影响实际效果

#### 防抖
- 当持续触发事件时，不执行函数，但是当触发停止一段时间后才执行一次

#### 节流
- 当持续触发事件时，也必需一段时间之内容再执行一次
```js
function jieliu(fn, wait) {
	// 开始时间
	var startTime = Date.now();
	return function() {
		var context = this;
		var args = arguments;
		var now = Date.now();
		if (currentTime - startTime >= wait) {
          fn.apply(context, args)
          startTime = Date.now()
		}
	}
}
```