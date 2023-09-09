<template>
  <q-page class="row justify-center items-center">
    <transition
      appear
      enter-active-class="animated fadeInDown"
      leave-active-class="animated zoomOut"
    >
      <q-card v-show="cardVisibility" class="bg-custom border-custom cardStyle">
        <q-card-section class="row justify-around">
          <div
            class="q-pa-sm bg-transparent no-pointer-events text-center text_custom border-custom"
          >
            <q-avatar
              icon="qr_code"
              color="blue"
              text-color="white"
              size="xl"
              class="border-custom glossy"
            />
            Scan Qr
          </div>
        </q-card-section>
        <q-separator dark />
        <q-card-section>
          <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <div style="width: 319px">
              <qrcode-stream
                class="overflow-hidden border-custom"
                :track="paintBoundingBox"
                @init="onInit"
                @decode="onDecode"
                v-if="!destroyed"
              >
              </qrcode-stream>
            </div>
          </transition>
          <q-inner-loading :showing="loading" class="bg-transparent">
            <q-spinner color="blue" size="3em" />
          </q-inner-loading>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            @click="reload"
            color="blue"
            glossy
            padding="xs md"
            class="border-custom"
            >Reset escaner</q-btn
          >
        </q-card-actions>
      </q-card>
    </transition>
  </q-page>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import SearchQr from '../components/home/SearchQr.vue'
import { mapState } from 'vuex'
export default {
  components: { QrcodeStream },
  data () {
    return {
      loading: false,
      destroyed: false
    }
  },

  computed: {
    ...mapState({
      cardVisibility: (state) => state.showcase.cardVisibility,
      showSearch: (state) => state.showcase.showSearch
    })
  },
  methods: {
    async onDecode (_id) {
      this.$q.loading.show()
      this.$store.commit('showcase/searchQr', { _id })
      const audio = await new Audio(
        require('../audio/Airplane-ding-sound.mp3')
      )
      audio.play()
      setTimeout(() => {
        this.$q.dialog({
          component: SearchQr,
          persistent: true,
          parent: this
        })
        this.$q.loading.hide()
      }, 1000)

      this.$store.commit('showcase/cardVisibility', false)
    },
    async onInit (promise) {
      this.loading = true
      this.$store.commit('showcase/searchQr', {})
      try {
        await promise
      } catch (error) {
        const audio = new Audio(require('../audio/Error-interface-tone.mp3'))
        audio.play()
        const { [error.name]: message } = {
          NotAllowedError: 'Debe otorgar permiso de acceso a la cámara',
          NotFoundError: 'No hay cámara en este dispositivo',
          NotSupportedError: 'Se requiere contexto seguro (HTTPS)',
          NotReadableError: '¿La cámara ya está en uso?',
          OverconstrainedError: 'Las cámaras instaladas no son adecuadas',
          StreamApiNotSupportedError:
            'Escaner Qr no es compatible con este navegador'
        }
        this.$q.notify({
          progress: true,
          message: '¡Error!',
          caption: message,
          textColor: 'red',
          color: '#fff',
          icon: 'error',
          iconSize: 'md',
          iconColor: 'red',
          position: 'bottom'
        })
      } finally {
        this.loading = false
      }
    },
    paintBoundingBox (detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height }
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
      }
    },
    async reload () {
      this.destroyed = true
      await this.$nextTick()
      this.destroyed = false
    }
  },
  created () {
    this.reload()
    this.onInit()
    this.$store.commit('showcase/cardVisibility', true)
    this.$q.notify({
      progress: true,
      message: 'Permitir cámara',
      caption: 'Aceptar si no lo ha hecho',
      textColor: 'blue-grey-4',
      color: 'grey-10',
      icon: 'priority_high',
      iconSize: 'md',
      iconColor: 'orange-4',
      position: 'top'
    })
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Slackey&display=swap");

.cardStyle {
  width: 350px;
}
.sectionStyle {
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: break-all;
}
.shadowIcons {
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
}
.border-custom {
  border: 1px solid white;
  border-radius: 12px;
}
.bg-custom {
  background-color: rgba(255, 255, 255, 0.1);
}
.text_custom {
  display: inline-block;
  transform: scale(1.14);
  font-family: "Slackey", cursive;
  font-size: 4.5em;
  cursor: pointer;
  color: #fff;
  -webkit-text-stroke: 0.4px rgba(36, 48, 132, 0.4);
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15), 0 20px 30px rgba(0, 0, 0, 0.15);
  font-size: 3em;
}
</style>
