import Server from 'socket.io'

export const io = new Server().attach(7080)

export default function startServer(store) {
  io.on(
    'connection',
    (socket) => {
      socket.on('action', (data) => {
        console.log('Socket action data: ' + JSON.stringify(data))
        if (data.type === 'REQUEST_LOGIN') {
          let action = {}
          Object.assign(action, {socketId: socket.id}, data)
          store.dispatch(action)
        } else {
          store.dispatch(data)
        }
      })
    }
  )
}
