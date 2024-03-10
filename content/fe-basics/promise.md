---
title: Promise 异步编程
---

[https://www.bilibili.com/video/BV1Zt42187oV/](https://www.bilibili.com/video/BV1Zt42187oV/)

### 函数式编程异步的传染性

https://www.bilibili.com/video/BV1qC411x7s2

react suspense 原理

## 手写Promise-构造器的实现

Promise A+

https://www.bilibili.com/video/BV1fU421o7R9

### promise 新方法 withResolvers()

```js
let resolver
const p = new Promise(res => resolver = res)

const { resolve, reject, promise } = Promise.withResolver()
promise.then(() => {

})
```
