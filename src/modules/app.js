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
const UPDATE_SESSION_TIME = `${MODULE}/SESSION/TIME/UPDATED`

// ------------------------------------
// Action Creators
// ------------------------------------
export const mountRequested = actionCreator(MOUNT_REQUESTED, 'payload')
export const update = actionCreator(UPDATE, 'payload')
export const updateSessionTime = actionCreator(UPDATE_SESSION_TIME, 'payload')

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE] : (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  },
  [UPDATE_SESSION_TIME] : (state, action) => {
    const time = _.get(state.session, 'time', 0) + 1

    return {
      ...state,
      session: {
        ...state.session,
        time
      }
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

const initialState = {
  session: {
    time : 2
  }
}

export const appReducer = (state = initialState, action) => {
  const combinedReducer = combineReducers({
    navigation: navigation.reducer,
    isLoaded: (state = true) => state,
    session: (state = {}) => state
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
export const getSession = state => getProp(state, 'session')
export const getSessionTime = state => _.get(getSession(state), 'time')

// ------------------------------------
// Sagas
// ------------------------------------
export function * mount (action) {
  // yield put(analytics.chapterViewRequested({ name: 'test' }))
}

// ------------------------------------
// Saga Watchers
// ------------------------------------
export function * sagas () {
  yield all([
    takeLatest(MOUNT_REQUESTED, mount)
  ])
}
