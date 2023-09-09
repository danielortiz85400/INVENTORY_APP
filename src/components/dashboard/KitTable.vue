<template>
  <div>
    <q-table
      :dense="$q.screen.lt.md"
      title="Equipos"
      :data="data"
      :columns="columns"
      row-key="_id"
      :filter="filter"
      no-results-label="Sin coincidencias"
      no-data-label="Sin registros aún."
      :pagination.sync="pagination"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
      table-header-style="background-color: rgba(255, 255, 255, 0.1);"
      class="table-custom"
      card-class="bg-transparent text-white border-custom "
      separator="cell"
      hide-bottom
      dark
    >
      <template v-slot:top>
        <div class="row justify-between q-gutter-y-sm full-width">
          <div class="col-6">
            <q-btn
              label="PDF"
              color="blue"
              padding="xs md"
              glossy
              icon="picture_as_pdf"
              :disable="Object.entries(data).length < 1"
              class="shadow-8 border-custom"
              @click="cretePDF"
            />
            <template>
              <GeneratePdf
                :selected="selected"
                ref="pdfGenerator"
                v-show="false"
              ></GeneratePdf>
            </template>
          </div>
          <q-space />
          <div class="col-6">
            <q-input
              v-model="filter"
              :disable="Object.entries(data).length < 1"
              label="Búsqueda rápida"
              debounce="300"
              color="primary"
              dense
              outlined
              dark
            >
              <template v-slot:append>
                <q-icon name="search" color="blue" />
              </template>
            </q-input>
          </div>
        </div>
      </template>
      <q-separator />
      <template v-slot:body-cell-Acciones="props">
        <q-td :props="props" class="q-gutter-xs">
          <q-btn
            v-for="({ icon, event, tooltip }, i) in btnsActions"
            :key="i"
            push
            color="blue"
            class="shadow-4 glossy shadow-8 border-custom"
            size="sm"
            :icon="icon"
            @click="event(props.row)"
          >
            <q-tooltip transition-show="scale" transition-hide="scale">
              {{ tooltip }}
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="primary"
        :max="pagesNumber"
        size="md"
        direction-links
        push
        glossy
        class="q-pa-xs border-custom q-gutter-xs shadow-12"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Swal from 'sweetalert2'
import QrcodeDialog from '../home/QrcodeDialog.vue'
import GeneratePdf from './PdfGenerator.vue'
import { requestOptions } from '../../helpers/request-optons'
import { endpoints } from '../../helpers/endpoints'

export default {
  components: { GeneratePdf },
  data () {
    return {
      remove: {},
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 5
        // numero de filas: xx si obtiene la informacion del servidor
      },
      filter: '',
      selected: [],
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'IDENTIFICADOR',
          align: 'left',
          field: (row) => row._id,
          format: (val) => `${val}`,
          sortable: true
        },
        {
          name: 'sede',
          align: 'center',
          label: 'SEDE',
          field: 'workplaceName',
          sortable: true
        },
        { name: 'Acciones', align: 'center', label: 'ACCIONES' }
      ],
      data: [],
      resRemoveKit: [],
      clearDataKit: [],
      btnsActions: [
        { icon: 'mode_edit', event: this.updateKit, tooltip: 'Editar' },
        { icon: 'delete', event: this.removeKit, tooltip: 'Remover' },
        { icon: 'qr_code', event: this.QrCreate, tooltip: 'Crear Qr' }
      ]
    }
  },
  watch: {
    allKits (kit) {
      this.data = kit
    }
  },
  computed: {
    ...mapState({
      allKits: (state) => state.showcase.allKits
    }),
    pagesNumber () {
      return Math.ceil(this.data.length / this.pagination.rowsPerPage)
    }
  },
  methods: {
    cretePDF () {
      if (Object.entries(this.selected).length < 1) {
        return this.$q.notify({
          progress: true,
          caption: 'Seleccione almenos un registro',
          icon: 'priority_high',
          color: 'rgba(255,255,255,0.3)',
          textColor: 'white',
          iconColor: 'orange-4',
          position: 'bottom'
        })
      }
      this.$refs.pdfGenerator.generateReport()
    },
    QrCreate ({ _id }) {
      this.$q.dialog({
        component: QrcodeDialog,
        persistent: true,
        parent: this
      })
      this.$store.commit('showcase/idQr', _id)
    },
    mssgConfirm () {
      if (this.resRemoveKit[0]?.success) {
        Swal.fire({
          width: '340',
          text: !this.resRemoveKit.length
            ? ''
            : this.resRemoveKit[0].success.mssg,
          icon: 'success',
          timer: 3400,
          timerProgressBar: true,
          showCancelButton: true,
          allowOutsideClick: false,
          showConfirmButton: true
        })
        this.resRemoveKit = []
      }
      if (this.resRemoveKit[0]?.error?.status === 400) {
        Swal.fire({
          width: '340',
          text: !this.resRemoveKit.length
            ? ''
            : this.resRemoveKit[0].error.mssg,
          icon: 'error',
          timer: 3400,
          timerProgressBar: true,
          showCancelButton: true,
          allowOutsideClick: false,
          showConfirmButton: true
        })
        this.resRemoveKit = []
      }
    },
    removeKit ({ _id }) {
      Swal.fire({
        width: '340',
        title: 'Eliminar',
        text: '¿Quiere eliminar el registro?',
        icon: 'question',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm: async () => {
          try {
            const query = await fetch(
              endpoints.kit.delete,
              requestOptions.delete({ _id })
            )
            const res = await query.json()
            this.resRemoveKit.push(res)
            this.readKits()
          } catch (error) {
            console.log('Algo ha ocurrido', error)
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.mssgConfirm()
        }
      })
    },
    ...mapActions({
      readKits: 'showcase/readKits'
    }),
    updateKit (kit) {
      this.$emit('updateKit', kit)
      console.log(kit)
    },
    getSelectedString () {
      return this.selected.length === 0
        ? ''
        : `${this.selected.length} Equipo${
            this.selected.length > 1 ? 's' : ''
          } seleccionado${this.selected.length > 1 ? 's' : ''} de ${
            this.data.length
          } `
    }
  },
  created () {
    this.readKits()
    this.data = this.allKits
  }
}
</script>

<style scoped>
.table-custom {
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: transparent;
}
.bg-custom {
  background-color: rgba(255, 255, 255, 0.2);
}
.q-checkbox__svg {
  color: #3b77ff;
  background: #ebedef;
}
.border-custom {
  border: 2px solid white;
  border-radius: 12px;
}
</style>
