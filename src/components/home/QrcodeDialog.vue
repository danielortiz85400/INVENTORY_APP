<template>
  <q-dialog ref="dialog" persistent @hide="onDialogHide">
    <q-card
      class="my-card q-dialog-plugin"
      style="border-radius: 15px; width: 320px"
    >
      <q-card-section class="row justify-center">
        <GenerateQrcode :text="idQr" />
      </q-card-section>
      <q-separator />
      <q-card-actions class="row justify-end">
        <q-btn @click="onCancelClick" push color="red" label="cerrar"
          ><q-tooltip transition-show="scale" transition-hide="scale"
            >Cerrar</q-tooltip
          >
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import GenerateQrcode from 'vue-qrcode-component'
import { mapState } from 'vuex'
export default {
  components: {
    GenerateQrcode
  },
  computed: {
    ...mapState({
      idQr: (state) => state.showcase.idQr
    })
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onCancelClick () {
      this.hide()
    }
  }
}
</script>
