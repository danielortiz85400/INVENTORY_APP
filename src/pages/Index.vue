<template>
  <q-page class="customStyle fullscreen flex flex-center">
    <Login />
  </q-page>
</template>

<script>
import Login from 'components/Login'
export default {
  name: 'PageIndex',
  components: { Login },
  computed: {
  },

  created () {
    this.$store.commit('showcase/setToken', null)
    this.$store.commit('showcase/usserInSession', [])
  }
}
</script>
