<template>
  <q-dialog ref="dialog" persistent @hide="onDialogHide">
    <q-card
      v-show="!cardShow"
      class="my-card q-dialog-plugin bg-custom border-custom"
      style="width: 340px"
    >
      <!--head-->
      <q-item>
        <q-item-section>
          <q-item-label
            ><q-chip
              class="no-pointer-events"
              square
              outline
              color="blue"
              icon="calendar_month"
            >
              CREADO:
            </q-chip>
          </q-item-label>
          <span class="text-caption text-white">{{
            resSearchQr.createdAt
          }}</span>
        </q-item-section>

        <q-item-section side top>
          <q-btn
            padding="xs md"
            label="cerrar"
            glossy
            color="red"
            class="border-custom"
            @click="onCancelClick"
          />
        </q-item-section>
      </q-item>

      <q-separator dark />
      <q-card-section class="row justify-around items-center shadow-4">
        <q-card-section>
          <q-img :src="urlImage" style="width: 230px; height: 150px" />
        </q-card-section>
        <q-card-section class="no-padding border-custom">
          <q-list dark>
            <q-item>
              <q-item-section avatar>
                <q-btn
                  class="q-ma-xs shadow-4 no-pointer-events border-custom"
                  glossy
                  round
                  color="transparent"
                  size="10px"
                  icon="verified"
                />
              </q-item-section>

              <q-item-section
                ><q-item-label class="text-weight-bold">IDENTIFICADOR</q-item-label>
                <q-item-label
                  class="sectionStyle text-weight-bold"
                  caption
                  lines="2"
                >
                  {{ resSearchQr._id }}
                </q-item-label></q-item-section
              >
            </q-item>
            <q-separator dark />
            <q-item>
              <q-item-section avatar>
                <q-btn
                  class="q-ma-xs shadow-4 no-pointer-events border-custom"
                  glossy
                  round
                  color="transparent"
                  size="10px"
                  icon="monitor"
                />
              </q-item-section>

              <q-item-section
                ><q-item-label class="text-weight-bold">PANTALLA</q-item-label>
                <q-item-label
                  class="sectionStyle text-weight-bold"
                  caption
                  lines="2"
                  >{{ resSearchQr.screen }}</q-item-label
                ></q-item-section
              >
            </q-item>
            <q-separator dark />
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-btn
                  class="q-ma-xs shadow-4 no-pointer-events border-custom"
                  glossy
                  round
                  color="transparent"
                  size="10px"
                  icon="devices"
                />
              </q-item-section>

              <q-item-section
                ><q-item-label class="text-weight-bold">CPU</q-item-label>
                <q-item-label
                  class="sectionStyle text-weight-bold"
                  caption
                  lines="2"
                  >{{ resSearchQr.cpu }}</q-item-label
                ></q-item-section
              >
            </q-item>
          </q-list>
          <div>
            <q-toolbar class="text-white shadow-4 row justify-center bg-custom border-custom__bottom">
              <q-tabs
                v-model="tab"
                active-color="blue"
                indicator-color="blue"
                class="bg-transparent"
              >
                <q-tab
                  name="inputPeripherals"
                  icon="input"
                  label="P. Entrada"
                />
                <q-tab
                  name="outputPeripherals"
                  icon="output"
                  label="P. Salida"
                />
              </q-tabs>
            </q-toolbar>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
              class="bg-transparent"
              dark
            >
              <!-- PERIFÉRICOS DE ENTRADA-->
              <q-tab-panel
                class="no-padding bg-transparent text-white"
                name="inputPeripherals"
              >
                <q-item>
                  <q-item-section avatar>
                    <q-btn
                      class="q-ma-xs shadow-4 no-pointer-events border-custom"
                      glossy
                      round
                      color="transparent"
                      size="10px"
                      icon="mouse"
                    />
                    <!-- <q-icon class="shadowIcons" color="primary" name="mouse" /> -->
                  </q-item-section>

                  <q-item-section
                    ><q-item-label class="text-weight-bold">MOUSE</q-item-label>
                    <q-item-label class="text-white" caption lines="2">{{
                      resSearchQr.mouse
                    }}</q-item-label></q-item-section
                  >
                </q-item>
                <q-separator dark />
                <q-item>
                  <q-item-section avatar>
                    <q-btn
                      class="q-ma-xs shadow-4 no-pointer-events border-custom"
                      glossy
                      round
                      color="transparent"
                      size="10px"
                      icon="keyboard"
                    />
                    <!-- <q-icon
                      class="shadowIcons"
                      color="primary"
                      name="keyboard"
                    /> -->
                  </q-item-section>

                  <q-item-section
                    ><q-item-label class="text-weight-bold"
                      >TECLADO</q-item-label
                    >
                    <q-item-label class="text-white" caption lines="2">{{
                      resSearchQr.keyboard
                    }}</q-item-label></q-item-section
                  >
                </q-item>
              </q-tab-panel>

              <!-- PERIFÉRICOS DE SALIDA-->
              <q-tab-panel class="bg-transparent" name="outputPeripherals">
                <q-item>
                  <q-item-section avatar>
                    <q-btn
                      class="q-ma-xs shadow-4 no-pointer-events border-custom"
                      glossy
                      round
                      color="transparent"
                      size="10px"
                      icon="headphones"
                    />

                  </q-item-section>
                  <q-separator dark />
                  <q-item-section
                    ><q-item-label class="text-weight-bold text-white"
                      >AURICULAR</q-item-label
                    >
                    <q-item-label class="text-white" caption lines="2">{{
                      resSearchQr.headphone
                    }}</q-item-label></q-item-section
                  >
                </q-item>
                <q-separator dark />
                <q-item>
                  <q-item-section avatar>
                    <q-btn
                      class="q-ma-xs shadow-4 no-pointer-events border-custom"
                      glossy
                      round
                      color="transparent"
                      size="10px"
                      icon="print"
                    />
                  </q-item-section>

                  <q-item-section
                    ><q-item-label class="text-weight-bold text-white"
                      >IMPRESORA</q-item-label
                    >
                    <q-item-label class="text-white" caption lines="2">{{
                      resSearchQr.print
                    }}</q-item-label></q-item-section
                  >
                </q-item>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </q-card-section>
      </q-card-section>
      <q-separator />
    </q-card>
    <q-card v-if="cardShow">
      <q-toolbar class="bg-red-3">
        <div>
          <q-chip class="shadow-4" outline color="white" text-color="white">
            <q-avatar icon="error" color="red" text-color="white" size="lg" />
            ¡Error!
          </q-chip>
        </div>
      </q-toolbar>
      <q-card-section>
        <div class="text-h6">Código inválido</div>
        <div class="text-subtitle2">{{ resSearchQr.error.mssg }}</div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn @click="onCancelClick" glosy color="blue">Cerrar</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { endpoints } from '../../helpers/endpoints'
import { requestOptions } from '../../helpers/request-optons'
import { mapState } from 'vuex'
export default {
  data: () => ({
    tab: 'inputPeripherals',
    resSearchQr: {},
    urlImage: ''
  }),
  watch: {
    resSearchQr: {
      handler (kit) {
        this.urlImage = kit.kitImage.path[0].url
      }
    }
  },
  computed: {
    ...mapState({
      searchQr: (state) => state.showcase.searchQr
    }),
    cardShow () {
      return !!this.resSearchQr?.error
    }
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onOKClick () {},
    onDialogHide () {
      this.$emit('hide')
    },
    onCancelClick () {
      this.hide()
      this.$store.commit('showcase/cardVisibility', true)
      this.resSearchQr = {}
      this.$store.commit('showcase/searchQr', {})
    }
  },
  async mounted () {
    try {
      const query = await fetch(
        endpoints.qr.findOne,
        requestOptions.post(this.searchQr)
      )
      const kit = await query.json()
      this.resSearchQr = kit?.success ? kit.success.kit : kit
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>
.border-custom {
  border: 2px solid white;
  border-radius: 12px;
}
.border-custom__bottom {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.bg-custom {
  background-color: rgba(255, 255, 255, 0.08);
}
</style>
