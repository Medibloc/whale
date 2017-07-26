import {fromJS} from 'immutable'
import {loginVerified} from './action_creators'
import store from './store'

export function addLoginRequest(state, email) {
  const requests = state.get('loginRequests')
  if (requests.indexOf(email) === -1) {
    return state.set('loginRequests', requests.push(email))
  } else {
    return state
  }
}

export function verifyLoginRequest(state, email, account, priKey) {
  const requests = state.get('loginRequests')
  const verified = state.get('loginVerified')
  if (requests.indexOf(email) === -1) {
    return state
  } else {
    const res = state.set('loginRequests', requests.delete(requests.indexOf(email)))
      .set('loginVerified', verified.push(email))
      .setIn(['accounts', email], fromJS({
        account: account,
        priKey: priKey
      }))
    return res
  }
}
