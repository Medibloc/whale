import {fromJS} from 'immutable'
import {loginVerified} from './action_creators'
import store from './store'
import {io} from './server'

export function addLoginRequest(state, email, socketId) {
  const requests = state.get('loginRequests')
  if (requests.indexOf(email) === -1) {
    return state.set('loginRequests', requests.push(fromJS({
      email,
      socketId
    })))
  } else {
    return state
  }
}

export function verifyLoginRequest(state, email, account, priKey) {
  const requests = state.get('loginRequests')

  let index = requests.findIndex(e => e.get('email') === email)
  if (index === -1) {
    return state
  }

  let socketId = requests.get(index).get('socketId')
  io.to(socketId).emit('login', {
    email,
    account,
    priKey
  })

  return state.set('loginRequests', requests.delete(index))
}
