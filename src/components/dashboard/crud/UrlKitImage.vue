<template>
  <q-dialog ref="dialog" persistent @hide="onDialogHide">
    <q-card
      class="my-card q-dialog-plugin"
      style="border-radius: 15px; width: 320px"
    >
      <q-card-section>
        <div
          class="absolute-top text-blue bg-grey-2 text-h5 text-center q-pa-0"
        >
          <q-chip>
            <q-avatar icon="image" color="blue" text-color="white" />
            Imagen actual
          </q-chip>
        </div>
      </q-card-section>
      <q-card-section class="q-pa-xl">
        <div class="row justify-center">
          <q-img
            :src="this.kitUrlImage"
            contain
            style="width: 230px; height: 150px"
          >
          </q-img>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn glossy color="blue" label="OK" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      kitUrlImage: (state) => state.showcase.kitUrlImage
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

    onOKClick () {
      this.$emit('ok')
      this.hide()
    },

    onCancelClick () {
      this.hide()
    }
  }
}
</script>
