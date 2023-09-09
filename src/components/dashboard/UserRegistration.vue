<template>
  <q-dialog ref="dialog" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin customCardStyle">
      <div style="box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, 0.2)">
        <q-toolbar
          class="bg-blue text-white row justify-center rounded-borders"
        >
          <div>
            <q-chip class="shadow-4" outline color="white" label="Usuarios" size="md" text-color="white" />
          </div>
        </q-toolbar>
      </div>
      <q-card-section>
        <div v-for="(input, i) in logData" :key="i">
          <q-input
            v-model="input.vmdl"
            :label="input.label"
            outlined
            dense
            class="q-mt-md"
            v-if="input.label !== 'Rol'"
            @keyup="mayus"
            :rules="[input.rules]"
          >
            <template v-slot:prepend>
              <q-btn round dense flat :icon="input.icon" color="blue" />
            </template>
          </q-input>
        </div>
        <q-select
          class="q-mt-md"
          outlined
          dense
          color="blue"
          v-model="logData.rol.vmdl"
          :options="logData.rol.options"
          :label="logData.rol.label"
          :rules="[val => !!val || 'Elija una sede por favor' ]"
        >
          <template v-slot:prepend>
            <q-icon :name="logData.rol.icon" color="blue" />
          </template>
        </q-select>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn
          class="shadow-4"
          glossy
          color="blue"
          label="OK"
          @click="create"
          :disabled="btnDisabled"
        />
        <q-btn
          class="shadow-4"
          glossy
          color="red"
          label="Cancelar"
          @click="onCancel"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { endpoints } from '../../helpers/endpoints'
import { requestOptions } from '../../helpers/request-optons'
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data: () => ({
    logData: {
      name: { vmdl: '', label: 'Nombre', icon: 'person', rules: (val) => !!val || '* Nombre requerido' },
      lastName: { vmdl: '', label: 'Apellido(1)', icon: 'last_page', rules: (val) => !!val || '* Apellido requerido' },
      email: { vmdl: '', label: 'Email', icon: 'contact_mail', rules: (val) => !!val || '* Email requerido' },
      password: { vmdl: '', label: 'Contraseña', icon: 'lock', rules: (val) => !!val || '* Contraseña requerida' },
      rol: {
        vmdl: '',
        options: ['ADMINISTRADOR', 'MODERADOR', 'USUARIO'],
        label: 'Rol',
        icon: 'workspace_premium'
      }
    },
    registrationReqReived: []
  }),
  computed: {
    btnDisabled () {
      return !!(this.logData.name.vmdl === '' ||
      this.logData.lastName.vmdl === '' ||
      this.logData.email.vmdl === '' ||
      this.logData.password.vmdl === '' ||
      this.logData.rol.vmdl === '')
    }
  },
  methods: {
    ...mapActions({
      readUsers: 'showcase/readUsers'
    }),
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      this.$emit('hide')
    },
    mayus () {
      this.logData.name.vmdl = this.logData.name.vmdl.toUpperCase()
      this.logData.lastName.vmdl = this.logData.lastName.vmdl.toUpperCase()
    },
    ConfirmRegisterDialog () {
      if (this.registrationReqReived?.length) {
        if (this.registrationReqReived[0]?.success) {
          Swal.fire({
            width: '340',
            text: !this.registrationReqReived.length
              ? ''
              : this.registrationReqReived[0].success.mssg,
            icon: 'success',
            timer: 3000,
            timerProgressBar: true,
            showCancelButton: true,
            allowOutsideClick: false,
            showConfirmButton: true
          })
          this.registrationReqReived = []
        }
        if (this.registrationReqReived[0]?.error?.status === 400) {
          Swal.fire({
            width: '340',
            text: !this.registrationReqReived.length
              ? ''
              : this.registrationReqReived[0].error.mssg,
            icon: 'error',
            timer: 3000,
            timerProgressBar: true,
            showCancelButton: true,
            allowOutsideClick: false,
            showConfirmButton: true
          })
          this.registrationReqReived = []
        }
        if (
          this.registrationReqReived.toString().substring(0, 16) ===
          'Error validating'
        ) {
          Swal.fire({
            width: '340',
            html: `<p>${this.registrationReqReived
              .toString()
              .substring(
                this.registrationReqReived.toString().indexOf('.') + 1
              )}</p>`,
            icon: 'error',
            showCancelButton: true,
            allowOutsideClick: false,
            showConfirmButton: true,
            footer: 'Campos requeridos'
          })
          this.registrationReqReived = []
        }
      }
    },

    create () {
      const body = Object.entries(this.logData).reduce(
        (obj, [key, { vmdl }]) => ({
          ...obj,
          [key]: vmdl
        }),
        {}
      )

      Swal.fire({
        width: '340',
        title: '¿Crear usuario?',
        text: 'Verifique su información',
        icon: 'question',
        showCancelButton: true,
        allowOutsideClick: false,
        showLoaderOnConfirm: true,
        cancelButtonText: 'Atrás',
        preConfirm: async () => {
          try {
            const query = await fetch(
              endpoints.signUp,
              requestOptions.post(body)
            )
            const res = query.ok === false ? await query.text() : await query.json()
            this.registrationReqReived.push(res)
            this.readUsers()
            if (query.ok === true) return this.hide()
          } catch (error) {
            console.log(error)
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.ConfirmRegisterDialog()
        }
      })
    },
    onCancel () {
      this.hide()
    }
  }
}
</script>

<style scoped>
.customCardStyle {
  max-width: 320px;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  -webkit-backdrop-filter: blur(11px);
  backdrop-filter: blur(11px);
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
