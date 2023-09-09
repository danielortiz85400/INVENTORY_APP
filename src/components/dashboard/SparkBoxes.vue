<template>
  <div>
    <div class="row justify-center">
      <div class="col-4 col-sm-4 col-md-4">
        <q-card class="row justify-center q-ma-md sparkboxes">
          <q-card-section vertical class="text-center">
            <div class="text-h4 text-weight-bold">{{ allKits.length }}</div>
            <div class="text-subtitle2">EQUIPOS</div>
          </q-card-section>
          <q-card-section vertical>
            <q-icon name="computer" style="font-size: 4em; text-shadow: 3px 3px 1px rgba(0,0,0,0.2)"
          /></q-card-section>
        </q-card>
      </div>

      <div class="col-4 col-sm-4 col-md-4">
        <q-card class="row justify-center q-ma-md sparkboxes">
          <q-card-section vertical class="text-center">
            <div class="text-h4 text-weight-bold">{{ workplaces.length }}</div>
            <div class="text-subtitle2">SEDES</div>
          </q-card-section>
          <q-card-section vertical>
            <q-icon name="business" style="font-size: 4em;text-shadow: 3px 3px 1px rgba(0,0,0,0.2)"
          /></q-card-section>
        </q-card>
      </div>

      <div class="col-4 col-sm-4 col-md-4">
        <q-card class="row justify-center q-ma-md sparkboxes">
          <q-card-section vertical class="text-center">
            <div class="text-h4 text-weight-bold">{{users.length}}</div>
            <div class="text-subtitle2">USUARIOS</div>
          </q-card-section>
          <q-card-section vertical>
            <q-icon name="people" style="font-size: 4em;text-shadow: 3px 3px 1px rgba(0,0,0,0.2)"
          /></q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      allKits: (state) => state.showcase.allKits,
      workplaces: (state) => state.showcase.workplaces,
      users: (state) => state.showcase.users
    })
  }
}
</script>
<style scoped>
.sparkboxes {
  background-image: linear-gradient(
    to right,
    #ece9e6 0%,
    #ffffff 51%,
    #ece9e6 100%
  );
}
.sparkboxes {
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;

  box-shadow: 0 0 8px #eee;
  border-radius: 10px;
}

.sparkboxes:hover {
  background-position: right center; /* change the direction of the change here */
  color: rgb(117, 114, 114);
  text-decoration: none;
}
</style>
