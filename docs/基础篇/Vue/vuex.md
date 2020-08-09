---
title: Vuex
---

## Vuex概述
`Vuex`是实现组件全局状态(数据)管理的一种机制,可以方便的实现组件之间数据的共享

## Vuex的基本使用

### 1.安装vuex依赖包
``` js
npm install vuex --save
```

### 2.导入vuex包
``` js
import Vuex from 'vuex'
Vue.use(Vuex)
```

### 3.创建store对象
``` js
const store = new Vuex.Store({
    state: {
        count: 0
    }
})
```

### 4.将store对象挂载到vue实例中
``` js
new Vue ({
    el: '#app',
    render: h => h(app),
    // 将创建的共享数据对象,挂载到Vue实例中
    // 所有的组件,就可以直接从store中获取全局的数据了
    store
})
```

## Vuex的核心概念

- State
> State提供唯一的公共数据源,所有的共享的数据都要统一放到Store中进行存储
``` js
const store = new Vuex.Store({
    state: {
        count: 0
    }
})
```

- Mutation
> 用于变更Store中的数据<br>
> 1.只能通过mutation变更Store数据,不可以直接操作Store中的数据<br>
> 2.通过这种方式虽然操作起来稍微繁琐一些,但是可以集中监控所有数据的变化
```js
// 定义Mutation
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        add(state, step) {
            // 变更状态
            state.count += step
        }
    }
})
```

- Action
>触发actions异步任务时携带参数
``` js
// 定义Action
const strore = new Vuex.Store({
    mutation: {
        add(state, step) {
            state.count += step
        }
    },
    actions: {
        addAsync(context, step) {
            setTimeout(() => {
                context.commit('add', step)
            }, 1000)
        }
    }
})
```


- Getter
> Getter用于对Store中的数据进行加工处理形成新的数据<br>
> 1.Getter可以对Store中也有的数据加工处理之后形成新的数据,类型Vue的计算属性<br>
> 2.Store中的数据发生变化,Getter的数据也会跟着变化
``` js
定义Getter
const store = new Vuex.Store({
    state: {
        count: 0
    },
    getters: {
        showNum: state => {
            return: '当前最新的数量是'+statecount
        }
    }
})
```


## 组件访问State数据的两种方式
- 第一种
``` js
this.$store.state.全局数据名称
```
- 第二种
``` js
// 从vuex中按需导入mapState函数
import { mapState } from 'vuex'

// 通过刚才导入的mapState函数,将当前组件需要的全局数据,映射为当前组件的computed计算属性
computed: {
    ...mapState({'count'})
}
```

## 组件修改State数据的两种方式
- 第一种
``` js
this.$store.commit.('add',3)
```
- 第二种
``` js
// 从vuex中按需导入mapState函数
import { mapMutations } from 'vuex'

// 通过刚才导入的mapMutations函数,将需要的mutations函数,映射为当前组件的methods方法
methods: {
    ...mapMutations(['add'])
    this.add(3);
}
```

## 组件异步修改State数据的两种方式
- 第一种
``` js
this.$store.dispatch('add', 3)
```
- 第二种
``` js
// 从vuex中按需导入mapState函数
import { mapActions } from 'vuex'

// 通过刚才导入的mapActions函数,将需要的actions函数,映射为当前组件的methods方法
methods: {
    ...mapActions(['addAsync'])
    this.addAsync(3);
}
```

## 组件访问getters的两种方式
- 第一种
``` js
this.$store.getters.名称
```
- 第二种
``` js
// 从vuex中按需导入mapState函数
import { mapGetters } from 'vuex'

// 通过刚才导入的mapActions函数,将需要的actions函数,映射为当前组件的methods方法
computed: {
    ...mapGetters(['shouNum'])
    this.mapGetters();
}
```


## Vuex的案列