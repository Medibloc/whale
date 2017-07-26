import {fromJS} from 'immutable'
import {addLoginRequest, verifyLoginRequest, loginVerified} from './core'

export const INITIAL_STATE = fromJS({loginRequests: [], loginVerified: [], accounts: {}})

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return addLoginRequest(state, action.email)
    case 'VERIFY_LOGIN':
      console.log('Action of verify: ' + action)
      return verifyLoginRequest(state, action.email, action.account, action.priKey)
    default:
      return state
  }
}
