# 项目开发说明
## 技术框架
1. 前端采用`Typescript + nuxt + vuex`架构，兼容IE8+
2. 调试、开发、构建使用`Webpack 4.0 + vue-cli3`，支持Typescript + ES6语法
3. 项目样式支持Sass,css
4. 异步请求使用`axios`，并在`api/requst.ts`中做了拦截器封装
5. 项目已集成 `webpack-spritesmith` `postcss-px2rem`等插件或类库，详情请查看nuxt.config.ts

## nuxt学习
'https://juejin.im/post/5cc81e1a6fb9a032414f695b'
## webpack-spritesmith
> 为了优化图标加载，项目使用`webpack-spritesmith`自动合并图标为sprite

### 使用方法
1. 安装`webpack-spritesmith`执行`npm install webpack-spritesmith --save`
2. 开发时将切图（1倍）放置`src/common/images/icon`目录，扩展名为**png**
3. 图标DOM的class以`icon-xxx`命名，xxx为图片名
4. 构建脚本会将icon下所有图片合并到一张sprite图上，并根据图片大小和定位，自动生成css代码

```
// 例如 images/icon/icon1.png,则页面dom为 <a class="icon-icon1"></a>
// 自动生成的css为
.icon { background-image: url(../images/sprite.png);background-size: 404px 266px;}
.icon-icon1 { width: 128px; height: 128px; background-position: 0px 0px; }

```
使用方法请参照'https://www.cnblogs.com/guangixn/p/10682131.html'

## postcss-px2rem
> vue项目利用postcss-px2rem适配不同屏幕,开发者无需关心px和rem的换算，只要在将px转换成rem

### 使用方法
1. 安装`postcss-px2rem`执行`npm install postcss-px2rem --save`
2. 开发过程中直接按照设计师给的设计稿的实际px写css即可。postcss-px2rem会自动转换
3. 在每个页面的index.html中插入一段脚本，脚本功能为根据dpr给html一个fongt-size值。

详情请参考'https://www.jianshu.com/p/8cb5fdce58bb'

## 异步请求规范
1. 使用axios、async、await开发

### get和post请求接口
```
import request from "~/api/request";

/*
 * @Description: GET请求
 */
export function getHotProduct(params:any) {
  return request({
      url: "/market/prod/hot",
      method: "get",
      headers: {
          'Content-Type': 'application/json;charset=UTF-8'
      },
      params
  });
}
/*
 * @Description: POST请求
 */
export function orderConfirm(params:any) {
  return request({
      url: "/cart/add",
      method: "post",
      headers: {
          'Content-Type': 'application/json'
      },
      data: params
  });
}

```

### 调用方式 

```
async getProductList() {
    try {
      let params = {}
      let res = await getHotProduct(params)
      if (res.data.code === 0) {
        console.log("初始化商品",res);
      } else{
        console.log(res.data.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }

```

## 目录结构及说明

```
|-- .nuxt                           // Nuxt自动生成，临时的用于编辑的文件，build
|-- api                             // axios拦截封装和请求的汇总
|-- assets                          // 用于组织未编译的静态资源如LESS、SASS、图片或JavaScript
|-- components                      // 用于自己编写公共的Vue组件
|-- layouts                         // 布局目录，用于组织应用的布局组件，不可更改
|-- middleware                      // 用于存放中间件
|-- pages                           // 用于存放写的页面，我们主要的工作区域
|   |-- index.vue                   // index页面
|   |-- index.vue                   // home页面
|-- static                          // 用于存放静态资源文件，比如图片
|--store                            // 用于组织应用的Vuex 状态管理
|-- |-- index.ts                    // index页面的vuex
|-- |-- home.ts                     // home页面的vuex
|-- types                           // 为了规范ts的一些数据类型而总结的规范
|-- nuxt.config.json                // 用于组织Nuxt.js应用的个性化配置，已覆盖默认配置
|-- package-lock.json               // npm自动生成，用于帮助package的统一设置的，yarn也有相同的操作
|-- package.json                    // npm 包管理配置文件
|-- postcss.config.js               // postcss-pxtorem插件配置
|-- README.md                       // 项目说明
|-- tsconfig.json                   // 指定了用来编译ts项目的根文件和编译选项
|-- tslint.json                     // ts书写规范
|-- pm2                             // Node进程守护，方便当服务挂掉时重启以及生成日志
|-- process.json                    // pm2的配置
```

## Build Setup
``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## 未来规划
1. 结合Nginx服务端部署和pm2启动nuxt项目服务

pm2和Nginx部署可参考
'https://blog.csdn.net/Sophie_U/article/details/86690053'
'https://juejin.im/post/5b863a93e51d4538884d2772'
