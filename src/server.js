import Server from 'socket.io'

export default function startServer(store) {
  const io = new Server().attach(7080)
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  )

  io.on(
    'connection',
    (socket) => {
      socket.on('action', store.dispatch.bind(store))
    }
  )
}
