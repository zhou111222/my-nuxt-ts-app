<template>
  <section>
    <h1 class="header">Nuxt TypeScript Starter</h1>
    <div class="cards">
      <Card
        v-for="person in people"
        :key="person.id"
        :person="person"
      ></Card>
    </div>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import { State } from "vuex-class"
import { Person } from "~/types";
import Card from "~/components/Card.vue"
import { create } from "domain";

@Component({
  components: {
    Card
  }
})
export default class Home extends Vue {
  @State people!: Person
  created() {
    if (process.browser) {
       console.log("00000000", process)
    } 
  }
  
  mounted() {
    console.log(this)
    this.$store.dispatch({type: 'getProductList'});
    if (process.browser) {
       console.log('111111111111111',process.env.NODE_ENV)
    } 
  }
}
</script>

<style lang="scss" scoped>
.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}
</style>
