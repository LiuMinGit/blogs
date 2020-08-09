---
title: mixin
---

## Mixin概述
混入`(mixin)`提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项


## 例子
### 定义一个混入对象
``` js
export const myMixin = {
    data() {
        return {
            num: 1
        }
    },
    created() {
        this.func_one();
        hello() {
            console.log('hello from mixin')
        }
    },
    methods: {
        func_one() {
            console.log('func_one from mixin')
        },
        func_two() {
            console.log('func_two from mixin')
        }
    }
}
```

### 组件1引用混入对象
``` vue
<template>
    <div>
        组件1里的num: {{ num }} //2
    </div>
</template>
<script>
    import { myMixin } from '@assets/mixin.js'
    export default {
        mixins: [myMixin],
        created() {
            this.num++;
            console.log('hello from self') // hello from mixin  //hello from self
            this.func_self();   //func_self from one
            this.func_one();    //func_one from mixin
            this.func_two();    //func_two from one
        ,}
        methods: {
            func_self() {
                console.log('func_self from one')
            },
            func_two() {
                console.log('func_two from one')
            }
        }
    }
</script>
```
### 组件2引用混入对象
``` vue
<template>
    <div>
        组件1里的num: {{ num }} //1
    </div>
</template>
<script>
    import { myMixin } from '@assets/mixin.js'
    export default {
        mixins: [myMixin],
    }
</script>
```


## Mixins特点
::: tip 提示
- 方法和参数在各组件中不共享
- 值为对象的选项，如methods,components等，选项会被合并，键冲突的组件会覆盖混入对象的
- 值为函数的选项，如created,mounted等，就会被合并调用，混合对象里的钩子函数在组件里的钩子函数之前调用
:::


## 与vuex的区别
::: tip 区别
- `vuex`：用来做状态管理的，里面定义的变量在每个组件中均可以使用和修改，在任一组件中修改此变量的值之后，其他组件中此变量的值也会随之修改
- `Mixins`：可以定义共用的变量，在每个组件中使用，引入组件中之后，各个变量是相互独立的，值的修改在组件中不会相互影响
:::


## 与公共组件的区别
::: tip 区别
- `组件`：在父组件中引入组件，相当于在父组件中给出一片独立的空间供子<br> **组件使用**: 然后根据props来传值，但本质上两者是相对独立的
- `Mixins`：则是在引入组件之后与组件中的对象和方法进行合并，相当于扩展了父组件的对象与方法，可以理解为形成了一个新的组件
:::
