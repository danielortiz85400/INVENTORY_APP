<template>
  <div class="q-pa-sm border-custom">
    <q-form id="form" @submit="createAndUpdate" enctype="multipart/form-data">
      <q-card class="customCardStyle">
        <div
          class="flex flex-center q-py-sm border-custom__bottom"
          style="box-shadow: 0px 3px 3px 2px rgba(0, 0, 0, 0.2)"
        >
          <div
            class="q-pa-xs bg-transparent no-pointer-events text-center text_custom "
          >

            {{updateKit === false ? 'Crear' : 'Editar'}}
          </div>
        </div>
        <q-card-section>
          <div class="border-custom q-pa-md">
            <q-input
              v-model.trim="id_image"
              name="kit_id"
              style="display: none"
            ></q-input>
            <q-file
              v-model.trim="regComputers.kitImage.vmdl"
              :label="regComputers.kitImage.label"
              name="kitImage"
              bottom-slots
              max-files="1"
              outlined
              dense
              dark
            >
              <template v-slot:file="{ file }">
                <q-chip
                  color="blue"
                  text-color="white"
                  square
                  class="full-width q-my-xs glossy"
                >
                  <div class="ellipsis relative-position">
                    {{ file.name }}
                  </div>

                  <q-tooltip>
                    {{ file.name }}
                  </q-tooltip>
                </q-chip>
              </template>

              <template v-slot:prepend>
                <q-btn
                  class="q-ma-xs shadow-4 no-pointer-events border-custom"
                  glossy
                  round
                  color="transparent"
                  size="8px"
                  :icon="regComputers.kitImage.icon"
                />
              </template>

              <template v-slot:append>
                <q-icon name="search" @click.stop />
              </template>

              <!-- <template v-slot:hint> Peso total: </template> -->
              <template v-slot:after>
                <q-btn
                  v-if="updateKit"
                  dense
                  flat
                  icon="visibility"
                  @click="previewImage"
                >
                  <q-tooltip
                    transition-show="scale"
                    transition-hide="scale"
                    content-class="bg-blue"
                  >
                    Vista previa
                  </q-tooltip>
                </q-btn>
              </template>
            </q-file>
            <q-select
              v-model.trim="regComputers.workplace.vmdl"
              :options="regComputers.workplace.options"
              :label="regComputers.workplace.label"
              :rules="[(val) => !!val || 'Elija una sede por favor']"
              lazy-rules
              name="workplace"
              dense
              outlined
              dark
            >
              <template v-slot:prepend>
                <q-btn
                  class="q-ma-xs shadow-4 no-pointer-events border-custom"
                  glossy
                  round
                  color="transparent"
                  size="8px"
                  :icon="regComputers.workplace.icon"
                />
              </template>
            </q-select>
            <q-input
              v-model.trim="regComputers.screen.vmdl"
              :label="regComputers.screen.label"
              :rules="[
                (val) => !!val || '* Requerido',
                (val) => val.length < 16 || 'Por favor use hasta 16 caracteres',
              ]"
              lazy-rules
              name="screen"
              outlined
              dense
              dark
              class="q-mt-sm"
              @keydown="isLetterOrNumbers($event)"
              @keyup="mayus"
            >
              <template v-slot:prepend>
                <q-btn
                  class="q-ma-xs shadow-4 no-pointer-events border-custom"
                  glossy
                  round
                  color="transparent"
                  size="8px"
                  :icon="regComputers.screen.icon"
                />
              </template>
            </q-input>
            <q-input
              v-model.trim="regComputers.cpu.vmdl"
              :label="regComputers.cpu.label"
              :rules="[
                (val) => !!val || '* Requerido',
                (val) => val.length < 16 || 'Por favor use hasta 16 caracteres',
              ]"
              lazy-rules
              name="cpu"
              outlined
              dense
              dark
              class="q-mt-sm"
              @keypress="isLetterOrNumbers($event)"
              @keyup="mayus"
            >
              <template v-slot:prepend>
                <q-btn
                  class="q-ma-xs shadow-4 no-pointer-events border-custom"
                  glossy
                  round
                  color="transparent"
                  size="8px"
                  :icon="regComputers.cpu.icon"
                />
                <!-- <q-btn
                  :icon="regComputers.cpu.icon"
                  color="blue"
                  flat
                  round
                  dense
                  class="shadow-custom__text"
                /> -->
              </template>
            </q-input>
          </div>
          <!-- copia de los inputs peripherals en el list (Debido a que v-for no permite obtener su v-model.trim para usarlo en FormData) -->
          <q-input
            style="display: none"
            v-model.trim="
              this.regComputers.peripherals.outputPeripherals.options[0].vmdl
            "
            name="mouse"
          ></q-input>
          <q-input
            style="display: none"
            v-model.trim="
              this.regComputers.peripherals.outputPeripherals.options[1].vmdl
            "
            name="keyboard"
          ></q-input>
          <q-input
            style="display: none"
            v-model.trim="
              regComputers.peripherals.inputPeripherals.options[0].vmdl
            "
            name="headphone"
          ></q-input>
          <q-input
            style="display: none"
            v-model.trim="
              regComputers.peripherals.inputPeripherals.options[1].vmdl
            "
            name="print"
          ></q-input>

          <!-- PERIFÉRICOS DE ENTRADA Y SALIDA -->

          <q-list class="overflow-hidden q-mt-md border-custom" bordered>
            <!-- <q-separator color="white" dark /> -->
            <q-expansion-item
              v-for="(item, i) in regComputers.peripherals"
              :key="i"
              :label="item.label"
              icon="important_devices"
              group="somegroup"
              tag="label"
              v-ripple
              expand-separator
              dark
              header-class="text-blue"
              header-style="border-bottom:1px solid rgba(255,255,255,0.2)"
              class="overflow-hidden"
              @click.prevent="() => (panel = item.options[0].value)"
            >
              <transition
                appear
                enter-active-class="animated fadeInDown"
                leave-active-class="animated zoomOut"
              >
                <q-item-section>
                  <q-separator color="white" dark />
                  <q-toolbar class="bg-custom text-white shadow-2">
                    <q-space></q-space>
                    <q-tabs
                      v-model="panel"
                      active-color="blue"
                      indicator-color="blue"
                      class="bg-transparent"
                    >
                      <q-tab
                        class="q-px-lg text-caption"
                        v-for="(tab, i) in item.options"
                        :key="i"
                        :name="tab.value"
                        :label="tab.value"
                        :icon="tab.icon"
                      >
                      </q-tab>
                    </q-tabs>
                    <q-space></q-space>
                  </q-toolbar>
                  <q-tab-panels v-model="panel" animated class="bg-transparent">
                    <q-tab-panel
                      v-for="(tab, i) in item.options"
                      :key="i"
                      :name="tab.value"
                    >
                      <q-input
                        v-model.trim="tab.vmdl"
                        :label="tab.label"
                        :rules="[
                          (val) => !!val || '* Requerido',
                          (val) =>
                            val.length < 16 || '16 caracteres permitidos',
                        ]"
                        outlined
                        dense
                        dark
                        @keypress="isLetterOrNumbers($event)"
                        @keyup="mayus"
                      >
                        <template v-slot:append>
                          <q-btn
                            :icon="tab.icon"
                            round
                            dense
                            flat
                            class="shadow-custom__text text-blue"
                          /> </template
                      ></q-input>
                    </q-tab-panel>
                  </q-tab-panels>
                </q-item-section>
              </transition>
            </q-expansion-item>
          </q-list>
          <template> </template>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            v-if="updateKit"
            label="Cancelar"
            padding="xs md"
            color="blue"
            glossy
            class="glossy shadow-4 border-custom text-caption"
            @click.prevent="returnCreate"
          />
          <q-btn
            v-if="!updateKit"
            color="blue"
            size="sm"
            glossy
            icon="clear_all"
            class="q-ml-sm shadow-3"
            @click="clearForm"
          >
            <q-tooltip transition-show="scale" transition-hide="scale">
              Limpiar fomulario
            </q-tooltip>
          </q-btn>
          <q-btn
            :label="!updateKit ? 'Crear' : 'Actualizar'"
            :disable="btnDisabled"
            type="submit"
            color="blue"
            padding="xs md"
            glossy
            class="shadow-4 q-mr-md border-custom text-caption"
          />
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script>
import { endpoints } from '../../../helpers/endpoints'
import { requestOptions } from '../../../helpers/request-optons'
import UrlKitImage from '../../dashboard/crud/UrlKitImage.vue'
import { mapState, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  props: ['dataKit'],
  data: function () {
    return {
      expanded: false,
      val: [],
      panel: '',
      updateKit: false,
      regComputers: {
        kitImage: { url: '', vmdl: null, label: 'Imagen', icon: 'add_a_photo' },
        workplace: {
          vmdl: '',
          options: [],
          label: 'Sede',
          icon: 'maps_home_work'
        },
        screen: { vmdl: '', label: 'Pantalla', icon: 'monitor' },
        cpu: { vmdl: '', label: 'Cpu', icon: 'devices' },
        peripherals: {
          outputPeripherals: {
            label: 'P. ENTRADA',
            icon: 'workspace_premium',
            options: [
              {
                vmdl: '',
                name: 'mouse',
                label: 'Mouse',
                value: 'mouse',
                icon: 'mouse'
              },
              {
                vmdl: '',
                name: 'keyboard',
                label: 'Teclado',
                value: 'teclado',
                icon: 'keyboard'
              }
            ]
          },
          inputPeripherals: {
            label: 'P. SALIDA',
            icon: 'workspace_premium',
            options: [
              {
                vmdl: '',
                name: 'headphone',
                label: 'Auriculares',
                value: 'auriculares',
                icon: 'headphones'
              },
              {
                vmdl: '',
                name: 'print',
                label: 'Impresora',
                value: 'impresora',
                icon: 'print'
              }
            ]
          }
        }
      },
      resCreateAndUpdate: [],
      id_image: '',
      ignoredValue: ''
    }
  },
  watch: {
    dataKit: {
      handler (kit) {
        this.regComputers.kitImage.url = kit.kitImage.path[0].url
        this.id_image = kit._id
        this.regComputers.screen.vmdl = kit.screen
        this.regComputers.workplace.vmdl = kit.workplaceName
        this.regComputers.cpu.vmdl = kit.cpu
        this.regComputers.peripherals.inputPeripherals.options[0].vmdl =
          kit.headphone
        this.regComputers.peripherals.inputPeripherals.options[1].vmdl =
          kit.print
        this.regComputers.peripherals.outputPeripherals.options[0].vmdl =
          kit.mouse
        this.regComputers.peripherals.outputPeripherals.options[1].vmdl =
          kit.keyboard
        this.updateKit = true
      }
    }
  },
  computed: {
    ...mapState({
      workplaces: (state) => state.showcase.workplaces
    }),

    // kitUpdateState () {
    //   return Object.keys(this.dataKit).length < 1
    //     ? (this.updateKit = false)
    //     : (this.updateKit = true)
    // },

    btnDisabled () {
      return !!(
        this.regComputers.kitImage.vmdl === '' ||
        this.regComputers.screen.vmdl === '' ||
        this.regComputers.cpu.vmdl === '' ||
        this.regComputers.peripherals.inputPeripherals.options[0].vmdl === '' ||
        this.regComputers.peripherals.inputPeripherals.options[1].vmdl === '' ||
        this.regComputers.peripherals.outputPeripherals.options[0].vmdl ===
          '' ||
        this.regComputers.peripherals.outputPeripherals.options[1].vmdl === ''
      )
    }
  },
  methods: {
    mayus () {
      this.regComputers.screen.vmdl =
        this.regComputers.screen.vmdl.toUpperCase()
      this.regComputers.cpu.vmdl = this.regComputers.cpu.vmdl.toUpperCase()
      this.regComputers.peripherals.inputPeripherals.options[0].vmdl =
        this.regComputers.peripherals.inputPeripherals.options[0].vmdl.toUpperCase()
      this.regComputers.peripherals.inputPeripherals.options[1].vmdl =
        this.regComputers.peripherals.inputPeripherals.options[1].vmdl.toUpperCase()
      this.regComputers.peripherals.outputPeripherals.options[0].vmdl =
        this.regComputers.peripherals.outputPeripherals.options[0].vmdl.toUpperCase()
      this.regComputers.peripherals.outputPeripherals.options[1].vmdl =
        this.regComputers.peripherals.outputPeripherals.options[1].vmdl.toUpperCase()
    },
    isLetterOrNumbers (event) {
      if (!/[a-zA-Z0-9\s]/.test(event.key)) {
        this.ignoredValue = event.key ? event.key : ''
        event.preventDefault()
        this.$q.notify({
          progress: true,
          message: '¿Registrar equipo?',
          caption: 'Use solo alfabeto y números',
          textColor: 'blue-grey-4',
          color: 'grey-10',
          icon: 'warning',
          iconSize: 'md',
          iconColor: 'orange-4',
          position: 'top'
        })
      }
    },
    previewImage () {
      this.$store.commit(
        'showcase/kitUrlImage',
        this.regComputers.kitImage.url
      )

      this.$q.dialog({
        component: UrlKitImage,
        persistent: true,
        parent: this
      })
    },
    returnCreate () {
      this.updateKit = false
      this.clearForm()
    },
    ...mapActions({
      readKits: 'showcase/readKits',
      readWorkplaces: 'showcase/workplaces'
    }),
    clearForm () {
      this.id_image = ''
      this.regComputers.kitImage.vmdl = null
      this.regComputers.screen.vmdl = ''
      this.regComputers.workplace.vmdl = ''
      this.regComputers.cpu.vmdl = ''
      this.regComputers.peripherals.inputPeripherals.options[0].vmdl = ''
      this.regComputers.peripherals.inputPeripherals.options[1].vmdl = ''
      this.regComputers.peripherals.outputPeripherals.options[0].vmdl = ''
      this.regComputers.peripherals.outputPeripherals.options[1].vmdl = ''
      document.getElementById('form').reset()
    },
    mssgConfirm () {
      if (this.resCreateAndUpdate?.length) {
        if (this.resCreateAndUpdate[0]?.success) {
          Swal.fire({
            width: '340',
            text: !this.resCreateAndUpdate.length
              ? ''
              : this.resCreateAndUpdate[0].success.mssg,
            icon: 'success',
            timer: 3400,
            timerProgressBar: true,
            showCancelButton: true,
            allowOutsideClick: false,
            showConfirmButton: true
          })
          this.resCreateAndUpdate = []
        }
        if (this.resCreateAndUpdate[0]?.error?.status === 400) {
          Swal.fire({
            width: '340',
            text: !this.resCreateAndUpdate.length
              ? ''
              : this.resCreateAndUpdate[0].error.mssg,
            icon: 'error',
            timer: 3400,
            timerProgressBar: true,
            showCancelButton: true,
            allowOutsideClick: false,
            showConfirmButton: true
          })
          this.resCreateAndUpdate = []
        }
        if (
          this.resCreateAndUpdate.toString().substring(0, 16) ===
          'Error validating'
        ) {
          Swal.fire({
            width: '340',
            html: `<p>${this.resCreateAndUpdate
              .toString()
              .substring(
                this.resCreateAndUpdate.toString().indexOf('.') + 1
              )}</p>`,
            icon: 'error',
            timer: 4000,
            timerProgressBar: true,
            showCancelButton: true,
            allowOutsideClick: false,
            showConfirmButton: true,
            footer: 'Campos requeridos'
          })
          this.resCreateAndUpdate = []
        }
      }
    },
    createAndUpdate () {
      const form = document.getElementById('form')
      const formData = new FormData(form)

      const path =
        this.updateKit === true
          ? `${endpoints.kit.update}`
          : ` ${endpoints.kit.create}`
      const req =
        this.updateKit === true
          ? requestOptions.update(formData)
          : requestOptions.postFormData(formData)
      const text =
        this.updateKit === true
          ? '¿Quiere modificar este registro?'
          : '¿Quiere crear este registro?'
      const title = this.updateKit === true ? 'Actualizar' : 'Crear'

      Swal.fire({
        width: '340',
        title,
        text,
        icon: 'question',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm: async () => {
          try {
            const query = await fetch(path, req)
            const res =
              query.ok === false ? await query.text() : await query.json()
            this.resCreateAndUpdate.push(res)
            this.readKits()
            this.returnCreate()
          } catch (error) {
            console.log('Algo ha ocurrido', error.message)
            this.clearForm()
          }
        }
      }).then((result) => {
        return result.isConfirmed ? this.mssgConfirm() : this.returnCreate()
      })
    }
  },

  created () {
    this.readWorkplaces()
    this.regComputers.workplace.options = this.workplaces
    this.updateKit = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
.customCardStyle {
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.border-custom {
  border: 2px solid white;
  border-radius: 12px;
}

.bg-custom {
  background-color: rgba(255, 255, 255, 0.08);
}
.shadow-custom__text {
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2);
}
.border-custom__bottom{
  border-bottom:1px solid rgba(255, 255, 255, 0.2)
}
.text_custom {
  display: inline-block;
  transform: scale(1.14);
  font-family: 'Pacifico', sans-serif;
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
