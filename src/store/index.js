import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex from 'vuex'

import showcase from './showcase'

Vue.use(Vuex)


export default function () {
  const Store = new Vuex.Store({
    modules: {
      showcase
    },
    strict: process.env.DEBUGGING,
    plugins: [createPersistedState()]
  })
  
  return Store
}
