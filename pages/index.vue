<template>
  <div class="container">
    <div class="w">
      <logo />
      <h1 class="title">
        my-nuxt-app
      </h1>
      <div class="link">vuex测试：{{$store.state.home.carNum}}</div>
      <div class="link">asyncData测试: {{info.msg}}</div>
      <div class="link">axios封装测试: {{info.msg}}</div>
      <div class="link">雪碧图优化</div>
      <ul class="sprit">
        <li class="icon icon-icon1"></li>
        <li class="icon icon-icon2"></li>
        <li class="icon icon-icon3"></li>
        <li class="icon icon-icon4"></li>
        <li class="icon icon-icon6"></li>
      </ul>
    </div>
  </div>
</template>


<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator";
import Logo from '~/components/Logo.vue';
import { getHotProduct } from '~/api/index.ts';
@Component({
  components: {
    Logo
  }
})

export default class Index extends Vue {
  // 服务端渲染页面需要的数据
  async asyncData() {
    let { data } = await getHotProduct({})
    return {info: data}
  }
  mounted() {
    console.log(this)
    this.getProductList()
  }
  // 异步请求接口数据
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
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .w{
    width: 100%;
    height: 100%;
    .sprit{
      display: flex;
      justify-content: space-between;
      list-style: none;
      li{
        width: 128px;
        height: 128px;
      }
    }
  }
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.link {
  margin-top: 15px;
}
</style>
