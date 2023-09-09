<template>
  <div id="q-app" class="bg-main">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import swal from 'sweetalert2'
window.Swal = swal
export default {
  name: 'App',
  methods: {
    ...mapActions({
      workplaces: 'showcase/workplaces',
      users: 'showcase/readUsers'
    })
  },
  created () {
    this.workplaces()
    this.users()
  }
}
</script>

<style >
.fullscreen{
  z-index:1;
}
.bg-main{
  background-image: radial-gradient( circle 815px at 23.4% -21.8%,  rgba(9,29,85,1) 0.2%, rgba(0,0,0,1) 100.2% );
}

::-webkit-scrollbar {
    height: 12px;
    width: 14px;
    background: transparent;
    z-index: 12;
    overflow: visible;
}

::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #c1c1c1;
    border-radius: 10px;
    z-index: 12;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    transition: background-color .32s ease-in-out;
    margin: 4px;
    min-height: 32px;
    min-width: 32px;
}

::-webkit-scrollbar-thumb:hover {
    background: #c1c1c1;
}
</style>
