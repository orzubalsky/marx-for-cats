import { combineReducers } from 'redux'
import { createResponsiveStateReducer } from 'redux-responsive'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { appReducer } from '../modules/app.js'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    browser: createResponsiveStateReducer({
      phone: 480,
      tabletPortrait: 600,
      tabletLandscape: 900,
      desktop: 1200,
      widescreen: 1800,
    }),
    form: formReducer,
    router: routerReducer,
    app: appReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
