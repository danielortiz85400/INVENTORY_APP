<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      v-if="this.$route.name === 'Dashboard' || this.$route.name === 'Home'"
      elevated
      class="bg-transparent"
    >
      <q-toolbar>
        <q-chip
          square
          size="md"
          icon="admin_panel_settings"
          color="transparent"
          text-color="white"
          class="shadow-4 no-pointer-events glossy text-bold q-pa-md"
          :label="this.$route.name === 'Dashboard' ? 'DASHBOARD' : 'HOME'"
        >
        </q-chip>
        <q-space />
        <div>
          <q-fab
            glossy
            square
            vertical-actions-align="left"
            color="transparent"
            padding="none md"
            :icon="this.$route.name === 'Dashboard' ? 'dashboard' : 'home_pin'"
            direction="down"
          >
            <q-fab-action
              v-if="this.$route.name === 'Dashboard'"
              label="Ir al home"
              icon="home"
              padding="3px"
              external-label
              color="secondary"
              label-position="left"
              class="glossy shadow-4 q-pa-xs"
              @click.prevent="$router.push({ name: 'Home' })"
            />
            <q-fab-action
              v-if="this.$route.name === 'Home' && usserInSession[0] === 'ADMINISTRADOR'"
              label="Ir al Dashboard"
              padding="3px"
              external-label
              label-position="left"
              color="secondary"
              icon="dashboard"
              class="glossy shadow-4 q-pa-xs"
              @click.prevent="$router.push({ name: 'Dashboard' })"
            />
            <q-fab-action
              label="Cerrar sesión"
              padding="3px"
              external-label
              label-position="left"
              color="blue"
              icon="logout"
              class="glossy shadow-4 q-pa-xs"
              @click.prevent="signOff"
            />
          </q-fab>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'MainLayout',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      usserInSession: (state) => state.showcase.usserInSession
    })
  },
  methods: {
    ...mapActions({
      logout: 'showcase/logout'
    }),
    signOff () {
      Swal.fire({
        width: '340',
        title: '¿Está seguro?',
        text: 'Desea terminar la sesión',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cerrar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.logout()
        }
      })
    }
  }
}
</script>
