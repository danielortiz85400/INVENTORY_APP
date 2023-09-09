<template>
  <div>
    <q-table
      :data="data"
      :columns="columns"
      :pagination.sync="pagination"
      dark
      hide-bottom
      row-key="_id"
      separator="cell"
      hide-pagination
      no-data-label="Sin registros aún."
      table-header-style="background-color: rgba(255, 255, 255, 0.1);"
      card-class="bg-transparent text-white border-custom "
    >
      <template v-slot:top>
        <q-btn
          label="Crear"
          padding="xs md"
          color="blue"
          icon="add_circle"
          glossy
          class="shadow-4 border-custom"
          @click="add"
        />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            push
            size="sm"
            icon="delete"
            class="glossy bg-blue border-custom"
            @click="remove(props.row)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
    <div class="flex justify-around q-mt-md ">
      <q-pagination
        v-model="pagination.page"
        :max="pagesNumber"
        direction-links
        color="primary"
        size="md"
        square
        glossy
        push
        class="q-gutter-xs shadow-12 q-pa-xs border-custom"
      />
    </div>
  </div>
</template>

<script>
import RegisterDialog from '../dashboard/UserRegistration.vue'
import { endpoints } from '../../helpers/endpoints'
import { requestOptions } from '../../helpers/request-optons'
import { mapState, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 5
      },
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
        { name: 'roleMain', align: 'center', label: 'ROL', field: 'roleMain' },
        {
          name: 'createdAt',
          align: 'center',
          label: 'F. CREACIÓN',
          field: 'createdAt'
        },
        { name: 'actions', align: 'center', label: 'ACCIONES' }
      ],
      data: [],
      resUsers: []
    }
  },
  watch: {
    users (user) {
      this.data = user
    }
  },
  computed: {
    ...mapState({
      users: (state) => state.showcase.users
    }),
    pagesNumber () {
      return Math.ceil(this.data.length / this.pagination.rowsPerPage)
    }
  },
  methods: {
    ...mapActions({
      readUsers: 'showcase/readUsers'
    }),
    mssgConfirm () {
      if (this.resUsers[0]?.success) {
        Swal.fire({
          width: '340',
          text: !this.resUsers.length ? '' : this.resUsers[0].success.mssg,
          icon: 'success',
          timer: 3400,
          timerProgressBar: true,
          showCancelButton: true,
          allowOutsideClick: false,
          showConfirmButton: true
        })
        this.resUsers = []
      }
      if (this.resUsers[0]?.error?.status === 400) {
        Swal.fire({
          width: '340',
          text: !this.resUsers.length ? '' : this.resUsers[0].error.mssg,
          icon: 'error',
          timer: 3400,
          timerProgressBar: true,
          showCancelButton: true,
          allowOutsideClick: false,
          showConfirmButton: true
        })
        this.resUsers = []
      }
    },
    add () {
      this.$q.dialog({
        component: RegisterDialog,
        persistent: true,
        parent: this
      })
    },
    remove ({ _id }) {
      Swal.fire({
        width: 340,
        icon: 'warning',
        title: 'Remover',
        text: '¿Quiere remover este usuario?',
        showCancelButton: true,
        preConfirm: async () => {
          try {
            const query = await fetch(
              endpoints.users.remove,
              requestOptions.delete({ _id })
            )
            const res = await query.json()
            this.resUsers.push(res)
            this.readUsers()
          } catch (error) {
            console.log()
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.mssgConfirm()
        }
      })
    }
  },

  created () {
    this.readUsers()
    this.data = this.users
  }
}
</script>
<style scoped>
.bg-custom {
  background-color: rgba(255, 255, 255, 0.2);
}
.border-custom {
  border: 2px solid white;
  border-radius: 12px;
}
</style>
