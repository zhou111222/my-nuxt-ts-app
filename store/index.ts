import { MutationTree, ActionTree, ActionContext } from "vuex";
import { Context as AppContext } from "@nuxt/types";
import { RootState, Person, Product } from "~/types";
import localRandomData from "~/static/random-data.json";
import { getHotProduct } from '~/api/index.ts';

export const state = (): RootState => ({
  people: [],
  productList: [],
  count: 1
})

export const mutations: MutationTree<RootState> = {
  setPeople(state: RootState, people: Person[]): void {
    state.people = people
  },
  setProduct(state: RootState, productList: Product[]): void {
    state.productList = productList
  }
}

interface Actions<S, R> extends ActionTree<S, R> {
  nuxtServerInit (actionContext: ActionContext<S, R>, appContext: AppContext): void
}

export const actions: Actions<RootState, RootState> = {
  async nuxtServerInit({ commit }, context) {
    let people: Person[] = []

    // If you serve the site statically with `nuxt generate`, you can't use HTTP requests for local
    people = context.isStatic ?
      localRandomData :
      await context.app.$axios.$get("./random-data.json")

    commit("setPeople", people.slice(0, 10))
  },
  async getProductList({ commit }) {
    try {
      let params = {}
      let res = await getHotProduct(params)
      if (res.data.code === 0) {
        console.log('hahahha');
        commit("setProduct", res.data.data)
      } else{
        console.log(res.data.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }
}