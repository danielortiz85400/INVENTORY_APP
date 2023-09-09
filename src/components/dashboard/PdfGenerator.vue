<template>
  <div>
    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="Reporte de equipos"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="landscape"
      pdf-content-width="100%"
      @hasStartedGeneration="hasStartedGeneration()"
      @hasGenerated="hasGenerated($event)"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <div class="q-pa-md">
          <div class="q-pa-md" style="max-width: 350px">
            <img
              :src="require('../../assets/IPS_LOGO.jpg')"
              width="120"
              height="80"
            />
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label>Fecha:</q-item-label>
                  <q-item-label caption lines="2">{{
                    `${Date()}`
                  }}</q-item-label>
                  <q-item-label>Equipos:</q-item-label>
                  <q-item-label caption lines="2">{{
                    selected.length
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <q-table
            :data="data"
            :columns="columns"
            row-key="name"
            hide-bottom
            separator="cell"
            bordered
            table-header-style="background-color:#2197F2; color:#fff"
          >
            <template v-slot:body-cell-Qr="props">
              <td :props="props" class="text-center">
                <CreateQrCode :text="props.row._id" :size="75" />
              </td>
            </template>
          </q-table>
        </div>
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>
import CreateQrCode from 'vue-qrcode-component'
import VueHtml2pdf from 'vue-html2pdf'
export default {
  props: ['selected'],
  components: {
    VueHtml2pdf,
    CreateQrCode
  },
  data () {
    return {
      columns: [
        {
          name: '_id',
          required: true,
          label: 'ID',
          align: 'left',
          field: (row) => row._id,
          format: (val) => `${val}`,
          sortable: true,
          classes: 'bg-grey-2 ellipsis',
          headerClasses: 'bg-blue text-white'
        },
        {
          name: 'workplaceName',
          align: 'center',
          label: 'SEDE',
          field: 'workplaceName'
        },
        {
          name: 'date',
          align: 'center',
          label: 'F. DE REGISTRO',
          field: 'createdAt'
        },
        { name: 'Qr', align: 'center', label: 'QR' }
      ],
      data: []
    }
  },
  methods: {
    generateReport () {
      this.data = this.selected
      this.$refs.html2Pdf.generatePdf()
    }
  }
}
</script>
