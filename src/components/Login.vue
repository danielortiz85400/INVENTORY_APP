<template>
  <div class="q-pa-sm text-center border-custom">
    <div
      class="q-px-sm no-pointer-events text_custom"
      style="background-image: radial-gradient( circle 815px at 23.4% -21.8%, rgb(4,13,38), rgb(2,6,18) );border-radius:100%;clip-path: polygon(0 20%, 100% 20%, 100% 84%, 0 84%);"
    >
      Sesión
    </div>
    <q-form @submit.prevent="signIn(user)" class="formStyle shadow-1 q-pa-xl">
      <!-- Usuario-->
      <q-input
        outlined
        bottom-slots
        v-model.trim="user.email"
        label="E-mail"
        dark
        :rules="[(val) => !!val || 'Email requerido']"
      >
        <template v-slot:prepend>
          <q-btn
            class="q-ma-xs shadow-4 no-pointer-events border-custom"
            glossy
            round
            color="transparent"
            size="12px"
            icon="account_circle"
          />
        </template>
      </q-input>

      <!-- Contraseña-->
      <q-input
        outlined
        bottom-slots
        v-model.trim="user.password"
        label="Contraseña"
        dark
        :type="isPwd ? 'password' : 'text'"
        :rules="[(val) => !!val || 'Contraseña requerida']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
        <template v-slot:prepend>
          <q-btn
            class="q-ma-xs shadow-4 no-pointer-events border-custom"
            glossy
            round
            color="transparent"
            size="12px"
            icon="lock"
          />
        </template>
      </q-input>
      <q-btn
        type="submit"
        :disabled="btnDisabled === 'string' || !user.email || !user.password"
        class="full-width q-mt-lg btnStyle"
        label="Login"
      />
    </q-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    isPwd: true,
    btnDisabled: null,
    user: {
      email: 'daniel@gmail.com',
      password: 'daniel123'
    }
  }),
  methods: {
    ...mapActions({
      signIn: 'showcase/signIn'
    })
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

.formStyle {
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  /* background-color: rgba(255, 255, 255, 0.1); */
}

.btnStyle {
  background-image: linear-gradient(
    to right,
    #ece9e6 0%,
    #ffffff 51%,
    #ece9e6 100%
  );
}

.btnStyle {
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: rgb(78, 78, 78);
  box-shadow: 0 0 4px #eee;
  border-radius: 10px;
}

.btnStyle:hover {
  background-position: right center;
  /* change the direction of the change here */
  color: rgb(78, 78, 78);
  text-decoration: none;
}

.border-custom {
  border: 2px solid white;
  border-radius: 12px;
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
  margin: 0 auto;
  margin-top: -70px;
  font-size: 5em;
  z-index: -1;
}
</style>
