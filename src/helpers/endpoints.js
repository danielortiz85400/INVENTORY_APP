// Urls disponibles en toda la aplicación
export const endpoints = {
  signIn: 'http://localhost:3001/api/signin',
  signUp: 'http://localhost:3001/api/signup',
  workplaces: {
    read: 'http://localhost:3001/api/read/workplace',
    create: 'http://localhost:3001/api/create/workplace',
    remove: 'http://localhost:3001/api/remove/workplace'
  },
  kit: {
    read: 'http://localhost:3001/api/read/kits',
    create: 'http://localhost:3001/api/kit/create',
    update: 'http://localhost:3001/api/kit/update',
    delete: 'http://localhost:3001/api/kit/delete'
  },
  users: {
    read: 'http://localhost:3001/api/read/users',
    remove: 'http://localhost:3001/api/users/remove'
  },
  qr: {
    findOne: 'http://localhost:3001/api/qr/findOne'
  }
}
