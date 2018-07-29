import _ from 'lodash'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import * as analytics from 'modules/analytics'
import * as navigation from 'modules/navigation'
import { actionCreator, log } from 'utils/common'

// ------------------------------------
// Action Type Constants
// ------------------------------------
const MODULE = 'APP'
const MOUNT_REQUESTED = `${MODULE}/MOUNT/REQUESTED`
const UPDATE = `${MODULE}/UPDATED`

// ------------------------------------
// Action Creators
// ------------------------------------
export const mountRequested = actionCreator(MOUNT_REQUESTED, 'payload')
export const update = actionCreator(UPDATE, 'payload')

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE] : (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const reducer = (state = [], action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

const initialState = {}

export const appReducer = (state = initialState, action) => {
  const combinedReducer = combineReducers({
    navigation: navigation.reducer,
    isLoaded: (state = true) => state
  })

  const intermediateState = combinedReducer(state, action)
  const finalState = reducer(intermediateState, action)

  return finalState
}

// ------------------------------------
// Selectors
// ------------------------------------
export const getModule = state => state.app
export const getProp = (state, prop, defaultVal) => _.get(getModule(state), prop, defaultVal)
export const getBrowser = state => state.browser

// ------------------------------------
// Sagas
// ------------------------------------
export function * mount (action) {
  yield put(analytics.chapterViewRequested({ name: 'test' }))
}

// ------------------------------------
// Saga Watchers
// ------------------------------------
export function * sagas () {
  yield all([
    takeLatest(MOUNT_REQUESTED, mount)
  ])
}
