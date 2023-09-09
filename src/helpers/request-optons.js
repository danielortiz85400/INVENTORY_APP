
// Opciones para las peticiones fetch
export const requestOptions = {
  get () {
    return {
      method: 'GET',
      ...headers()
    }
  },
  post (body) {
    return {
      method: 'POST',
      body: JSON.stringify(body),
      ...headers()
    }
  },
  postFormData (body) {
    return {
      method: 'POST',
      body: body,
      ...headerFormData()
    }
  },
  update (body) {
    return {
      method: 'PUT',
      body: body,
      ...headerFormData()
    }
  },
  delete (body) {
    return {
      method: 'DELETE',
      body: JSON.stringify(body),
      ...headers()
    }
  }

}

function headers () {
  const { showcase } = JSON.parse(localStorage.getItem('vuex'))
  const authHeader = showcase?.tokenState ? showcase.tokenState : {}
  return {
    headers: {
      'Content-type': 'application/json',
      secret_token: authHeader
    }
  }
}
function headerFormData () {
  const { showcase } = JSON.parse(localStorage.getItem('vuex'))
  const authHeader = showcase?.tokenState ? showcase.tokenState : {}
  return {
    headers: {
      secret_token: authHeader
    }
  }
}
