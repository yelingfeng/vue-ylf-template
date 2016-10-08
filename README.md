# vue-ylf-template

 一套偏PC端的混合vue2.0模板 抽取<code>vue-cli</code> webpack完整版 去掉<code>eslint</code>, <code>test</code> 去其精华 取其糠糟

## 整合技术栈

- [x] vue@2.0.0-rc.4
- [x] vue-resource@1.0.0
- [x] vuex@2.0.0-rc.4
- [x] bootstrap
- [x] jquery
- [x] echarts
- [x] layer
- [x] lodash
- [x] foundation-datepicker@1.5.3
- [x] moment
- [x] easyui


## How to use 

fisrt install  vue-cli 

```nodejs
  
   $ npm install vue-cli -g 
  
```

init vue-ylf-template

```nodejs
  
   $ vue init yelingfeng/vue-ylf-template {projectName}
   $ cd {projectName}
   
```
install
```nodejs
   $ npm install      

```

dev
```nodejs 

    // 启动api-server
   $ npm run api-server
   
    // 启动开发模式
   $ npm run dev
   
```

build
```nodejs 
   $ npm run build 
```

## 目录结构

````javascript

├─build
├─config
└─src
    ├─api
    ├─assets
    │  ├─css
    │  ├─images
    │  └─lib
    │      ├─easyui
    │      │  ├─css
    │      │  ├─images
    │      │  │  └─icons
    │      │  └─js
    │      └─layer_mobile
    │          └─need
    ├─components
    │  ├─Pie
    │  │  └─sub
    │  └─util
    ├─store
    └─views

```

## 启动这个画面说明你成功了

![](/screen01.png)
