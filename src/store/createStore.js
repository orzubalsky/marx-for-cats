import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import promise from 'redux-promise'
import { responsiveStoreEnhancer } from 'redux-responsive'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import makeRootReducer from './reducers'
import sagas from './sagas.js'

const createStore = (initialState = {}) => {
  // Create a history of your choosing (we're using a browser history in this case)
  const history = createHistory()

  // Build the middleware for intercepting and dispatching navigation actions
  const routeMiddleware = routerMiddleware(history)

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [promise, routeMiddleware, sagaMiddleware]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  let composeEnhancers = compose

  if (__DEV__ || __STG__) {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      responsiveStoreEnhancer,
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}
  store.history = history

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }
  sagaMiddleware.run(sagas)

  return store
}

export default createStore
