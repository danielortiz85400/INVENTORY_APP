
import { Notify, Loading } from 'quasar'
import { requestOptions } from '../../helpers/request-optons'
import { endpoints } from '../../helpers/endpoints'

// INICIO DE SESIÓN
export async function signIn ({ commit }, user) {
  Loading.show({
    message: 'Iniciando sesión...'
  })

  try {
    const query = await fetch(endpoints.signIn, requestOptions.post(user))
    const res = query.ok === false ? await query.text() : await query.json()

    if (res?.error || typeof res === 'string') {
      Notify.create({
        progress: true,
        timeout: 3400,
        message: '¡Error!',
        caption: res?.error ? res.error.mssg : res.substring(res.indexOf('.') + 1),
        icon: 'no_accounts',
        textColor: 'white',
        iconColor: 'red'
      })
      commit('setToken', null)
      Loading.hide()
      return
    }
    commit('usserInSession', res.success.role) // rol
    commit('setToken', res.success.token) // token
    if (res.success?.token) {
      const { [res.success.role[0]]: route } = {
        ADMINISTRADOR: 'Dashboard',
        MODERADOR: 'Dashboard',
        USUARIO: 'Home'
      }
      this.$router.push({ name: route })
      Loading.hide()
    }
  } catch (error) {
    console.log(error)
  }
}

// CERRAR SESIÓN
export function logout ({ commit }) {
  Loading.show({
    message: 'Cerrando sesión'
  })
  localStorage.clear()
  commit('usserInSession', '')
  commit('setToken', null)
  setTimeout(() => {
    this.$router.push({ name: 'Login' })
    Loading.hide()
  }, 3000)
}

// SEDES
export async function workplaces ({ commit }) {
  try {
    const query = await fetch(endpoints.workplaces.read, requestOptions.get())
    const res = await query.json()
    const workplaces = res.map(k => k.name).flat()
    commit('workplaces', workplaces)
  } catch (error) {
    console.log(error)
  }
}

// EQUIPOS
export async function readKits ({ commit }) {
  try {
    const query = await fetch(endpoints.kit.read, requestOptions.get())
    const kits = await query.json()
    commit('allKits', kits.success.kits)
  } catch (error) {
    console.log('búscando equipos...')// todo: DEBUG
  }
}

// USUARIOS
export async function readUsers ({ commit }) {
  try {
    const query = await fetch(endpoints.users.read, requestOptions.get())
    const users = await query.json()
    commit('allUser', users.success.users)
  } catch (error) {
    console.log('búscando usuarios...')// todo: DEBUG
  }
}
