<template>
  <q-card
    class="q-ma-md q-px-sm bg-transparent border-custom"
    style="max-width: 300px"
  >
    <div
      style="box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.2);position relative;"
    ></div>
    <q-card-section vertical>
      <div class="q-pa-md q-gutter-sm">
        <q-badge color="blue">Crear o remover</q-badge>
        <q-input
          v-model.trim="workplace.name"
          label="Elija o cree una sede"
          hint="Máximo 8 caracteres"
          color="blue"
          maxlength="8"
          outlined
          dense
          dark
          @keypress="isLetter($event)"
          @keyup="mayus"
        />
        <q-badge class="q-mt-md" color="blue">Sedes actuales</q-badge>
        <q-select
          v-model.trim="workplace.name"
          :options="workplaces"
          label="Sedes"
          icon="apartment"
          color="blue"
          outlined
          dense
          dark
        >
          <template v-slot:prepend>
            <q-btn
              class="q-ma-xs shadow-4 no-pointer-events border-custom"
              glossy
              round
              color="transparent"
              size="8px"
              icon="maps_home_work"
            />
          </template>
        </q-select>
      </div>

      <q-card-actions class="justify-around">
        <q-btn
          v-for="{ label, icon, tooltip, method } in btnsActions"
          :key="label"
          :icon="icon"
          :label="label"
          :disabled="workplace.name === ''"
          color="blue"
          push
          glossy
          size="md"
          class="shadow-8 border-custom"
          @click.prevent="method"
        >
          <q-tooltip transition-show="scale" transition-hide="scale">
            {{ tooltip }}
          </q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card-section>
    <q-separator />
    <q-card-actions><br /></q-card-actions>
  </q-card>
</template>

<script>
import { endpoints } from '../../helpers/endpoints'
import { requestOptions } from '../../helpers/request-optons'
import { mapState, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      text: '',
      workplace: { name: '' },
      options: null,
      resWorkplaces: [],
      btnsActions: [
        {
          label: 'Crear',
          icon: 'add_circle',
          tooltip: 'Agregar sede',
          method: this.create
        },
        {
          label: 'Remover',
          icon: 'delete',
          tooltip: 'Remover sede',
          method: this.remove
        }
      ]
    }
  },
  watch: {
    workplaces (val) {
      this.options = val
    }
  },
  computed: {
    ...mapState({
      workplaces: (state) => state.showcase.workplaces
    })
  },
  methods: {
    ...mapActions({
      workplacesRead: 'showcase/workplaces'
    }),
    mayus () {
      this.workplace.name = this.workplace.name.toUpperCase()
    },
    isLetter (e) {
      const char = String.fromCharCode(e.keyCode)
      if (/^[A-Za-z]+$/.test(char)) return true
      else {
        e.preventDefault()
        this.$q.notify({
          progress: true,
          message: '¿Crear sede?',
          caption: 'Use solo mayúsculas.',
          textColor: 'blue-grey-4',
          color: 'grey-10',
          icon: 'warning',
          iconSize: 'md',
          iconColor: 'orange-4',
          position: 'top'
        })
      }
    },
    mssgConfirm () {
      if (this.resWorkplaces?.length) {
        if (this.resWorkplaces[0]?.success) {
          Swal.fire({
            width: '340',
            text: !this.resWorkplaces.length
              ? ''
              : this.resWorkplaces[0].success.mssg,
            icon: 'success',
            timer: 3400,
            timerProgressBar: true,
            showCancelButton: true,
            allowOutsideClick: false,
            showConfirmButton: true
          })
          this.resWorkplaces = []
        }
        if (this.resWorkplaces[0]?.error?.status === 400) {
          Swal.fire({
            width: '340',
            text: !this.resWorkplaces.length
              ? ''
              : this.resWorkplaces[0].error.mssg,
            icon: 'error',
            timer: 3400,
            timerProgressBar: true,
            showCancelButton: true,
            allowOutsideClick: false,
            showConfirmButton: true
          })
          this.resWorkplaces = []
        }
        if (
          this.resWorkplaces.toString().substring(0, 16) === 'Error validating'
        ) {
          Swal.fire({
            width: '340',
            html: `<p>${this.resWorkplaces
              .toString()
              .substring(this.resWorkplaces.toString().indexOf('.') + 1)}</p>`,
            icon: 'error',
            timer: 4000,
            timerProgressBar: true,
            showCancelButton: true,
            allowOutsideClick: false,
            showConfirmButton: true,
            footer: 'Campos requeridos'
          })
          this.resWorkplaces = []
        }
      }
    },
    create () {
      Swal.fire({
        width: 350,
        icon: 'question',
        title: 'Crear',
        text: '¿Quiere crear esta sede?',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm: async () => {
          try {
            const query = await fetch(
              endpoints.workplaces.create,
              requestOptions.post(this.workplace)
            )
            const res =
              query.ok === false ? await query.text() : await query.json()
            this.resWorkplaces.push(res)
            this.workplacesRead()
            this.workplace.name = ''
          } catch (error) {
            console.log(error) // todo DEBUG
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.mssgConfirm()
        } else {
          this.workplace.name = ''
        }
      })
    },
    remove () {
      Swal.fire({
        width: 350,
        icon: 'warning',
        title: 'Remover',
        text: '¿Quiere remover esta sede?',
        showCancelButton: true,
        timer: 4000,
        timerProgressBar: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm: async () => {
          try {
            const query = await fetch(
              endpoints.workplaces.remove,
              requestOptions.delete(this.workplace)
            )
            const res =
              query.ok === false ? await query.text() : await query.json()
            this.resWorkplaces.push(res)
            this.workplacesRead()
            this.workplace.name = ''
          } catch (error) {
            console.log(error) // todo DEBUG
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.mssgConfirm()
        }
      })
    }
  }
}
</script>

<style scoped>
.border-custom {
  border: 2px solid white;
  border-radius: 12px;
}
</style>
