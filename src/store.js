import {applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'
import reducer from './reducer'

const middleware = () => {
  return applyMiddleware(logger)
}

function makeStore() {
  return createStore(reducer, middleware())
}

const store = makeStore()

export default store
