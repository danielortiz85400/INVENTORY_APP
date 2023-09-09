<template>
  <q-page class="q-mt-sm">
    <div class="row">
      <div class="col-xs-12 col-md-4 q-pa-md"><CrudKit :dataKit="dataKit" /></div>
      <div class="col-xs-12 col-md-8 q-pa-md">
        <div class="q-pa-sm border-custom">
          <q-tabs
            v-model="tab"
            dense
            :narrow-indicator="false"
            class="q-mt-xs bg-custom radius-custom__top border-custom__bottom"

          >
            <q-tab
              v-for="({ name, style, icon, label }, i) in q_tab"
              :key="i"
              :label="label"
              :name="name"
              :icon="icon"
              :class="style"

            />
          </q-tabs>

          <q-tab-panels
            v-model="tab"
            animated
            transition-prev="jump-up"
            transition-next="jump-up"
            class="bg-custom radius-cutom_bottom "
          >
            <q-tab-panel
              v-for="({ name, component }, i) in q_tab_panel"
              :key="i"
              :name="name"
               class="bg-transparent overflow-hidden"
            >
              <component :is="component" @updateKit="updateKit" />
            </q-tab-panel>
          </q-tab-panels>
        </div>
        <SearchQr ></SearchQr>
      </div>
    </div>
  </q-page>
</template>

<script>
import KitTable from '../components/dashboard/KitTable.vue'
import CrudKit from '../components/dashboard/crud/CreateAndUpdate.vue'
import Workplace from '../components/dashboard/Workplace.vue'
import UserTable from '../components/dashboard/UserTable.vue'
import SearchQr from '../components/home/SearchQr.vue'

export default {
  data: () => ({
    kit: null,
    removeKit: {},
    dataKit: {},
    tab: 'KitTable',
    splitterModel: 2,
    q_tab: [
      {
        name: 'KitTable',
        style: 'text-blue',
        icon: 'devices',
        label: 'Equipos'
      },
      {
        name: 'UserTable',
        style: 'text-blue',
        icon: 'group',
        label: 'Usuarios'
      },
      {
        name: 'Workplace',
        style: 'text-blue',
        icon: 'apartment',
        label: 'Sedes'
      }
    ],
    q_tab_panel: [
      { name: 'KitTable', component: KitTable, emitEvent: 'updateKit' },
      { name: 'UserTable', component: UserTable, emitEvent: '' },
      { name: 'Workplace', component: Workplace, emitEvent: '' }
    ]
  }),
  components: { CrudKit, SearchQr },

  methods: {
    updateKit (kit) {
      this.dataKit = kit
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.radius-custom{
  border-radius: 12px;
}
.radius-custom__top{
  border-radius: 12px 12px 0px 0px;
}
.radius-cutom_bottom{
  border-radius: 0px 0px 12px 12px;
}
.bg-custom {
  background-color: rgba(255, 255, 255, 0.08);
}
</style>
