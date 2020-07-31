---
title: Promise
---

## promise语法
```js
var promise = new Promise((resolve, reject) => {/* executor函数 */
    // ... some code
    if (/* 异步操作成功 */){
        resolve(value);
    } else {
        reject(error);
    }
});
promise.then((value) => {
    //success
}, (error) => {
    //failure
})
```

## 一.封装小程序请求
```js
// 作用：用来将 wx.request 封装为一个 promise 对象
// promise 特点：
//  一创建就立即执行，一般情况下解决这个问题我们会将其封装为一个函数
// options:请求时的参数对象
function myrequest(options) {
    var p = new Promise((resolve, reject) => {
      // 逻辑：发送请求到服务器
      wx.request({
        url: options.url,
        method: options.method || "GET",
        data: options.data || {},
        header: options.header || {},
        success: res => {
          resolve(res);
        },
        fail: err => {
          reject(err);
        }
      });
    });
    // 返回一个promise 对象
    return p;
  }
  
  // 暴露给外界
  export default myrequest;
  ```

> #### 页面引入
```js
// 导入 myrequest 
<script>
import myrequest from '../../utils/myrequest'
export default {
  data() {
    return {
      // 请求路径相同的部分
      baseUrl: 'https://api.douban.com/v2/movie/',
      // 不同的部分
      url: '',
      // 数据源
      dataList: []
    }
  },
  onLoad(options) {
    // 调用方法得到数据
    this.getList()
  },
  methods: {
    // 请求数据
    async getList() {
      let res = await myrequest({
        url: `${this.baseUrl}${this.url}?apikey=0df993c66c0c636e29ecbb5344252a4a`,
        header: {
          'content-type': 'json'
        }
      })
      // 将数据源进行赋值
      this.dataList = res.data.subjects
      // 给数据添加星星
      this.dataList.forEach(item => {
        item.num = Math.ceil(item.rating.average / 2)
      })
    }
  }
}
</script>
```

## 二.封装axios
> get
```js
export const get = (url,params)=>{
    params = params || {};
    return new Promise((resolve,reject)=>{
        // axiso 自带 get 和 post 方法
        $http.get(url,{
            params,
        }).then(res=>{
            if(res.data.status===0){
                resolve(res.data);
            }else{
                alert(res.data.msg)
            }
        }).catch(error=>{
            alert('网络异常');
        })
    })
}
```

> post
```js
export const post = (url,params)=>{
    params = params || {};
    return new Promise((resolve,reject)=>{
        $http.post(url,params)
        .then(res=>{
            if(res.data.status===0){
                resolve(res.data);
            }else{
                alert(res.data.msg);
            }
        }).catch(error=>{
            alert('网络异常');
        })
    })
}
```
> #### 页面引入
```js
created() {
    this.getFilmList();
  },
  methods: {
    async getFilmList() {
      const url = "/film/getList";
      // 要访问第二页的话在网址后面加 ?type=2&pageNum=页数
      const res = await this.$http.get(url);
      this.filmList = res.films;
    },
```