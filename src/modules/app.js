import _ from 'lodash'
import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import firebase from 'firebase'
import * as analytics from 'modules/analytics'
import * as navigation from 'modules/navigation'
import * as videos from 'modules/videos'
import { actionCreator, averageEventData, log } from 'utils/common'

// ------------------------------------
// Action Type Constants
// ------------------------------------
const MODULE = 'APP'
const MOUNT_REQUESTED = `${MODULE}/MOUNT/REQUESTED`
const UPDATE = `${MODULE}/UPDATED`
const UPDATE_SESSION_DATA = `${MODULE}/SESSION/DATA/UPDATED`
const UPDATE_SESSION_TIME = `${MODULE}/SESSION/TIME/UPDATED`
const UPDATE_SESSION_TIME_REQUESTED = `${MODULE}/SESSION/TIME/UPDATE/REQUESTED`

// ------------------------------------
// Action Creators
// ------------------------------------
export const mountRequested = actionCreator(MOUNT_REQUESTED, 'payload')
export const update = actionCreator(UPDATE, 'payload')
export const updateSessionData = actionCreator(UPDATE_SESSION_DATA, 'payload')
export const updateSessionTime = actionCreator(UPDATE_SESSION_TIME, 'payload')
export const updateSessionTimeRequested = actionCreator(UPDATE_SESSION_TIME_REQUESTED, 'payload')
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
  [UPDATE_SESSION_DATA] : (state, action) => {
    const data = _.chain(action.payload.data)
      .find(d => d.name === '/')
      .get('events')
      .value()

    const average = averageEventData(data, 'attention')

    return {
      ...state,
      session: {
        ...state.session,
        data,
        average
      }
    }
  },
  [UPDATE_SESSION_TIME] : (state, action) => {
    const previousTime = _.get(state.session, 'time', 0)
    const time = !document.hidden ? previousTime + state.frameTime : previousTime

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
  frameTime: 183,
  isFooterExpanded: false,
  session: {
    time : 0
  }
}

export const appReducer = (state = initialState, action) => {
  const combinedReducer = combineReducers({
    analytics: analytics.reducer,
    navigation: navigation.reducer,
    videos: videos.reducer,
    frameTime: (state = 0) => state,
    isFooterExpanded: (state = false) => state,
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
export const getFrameTime = state => getProp(state, 'frameTime')

// ------------------------------------
// Sagas
// ------------------------------------
export function * mount (action) {
  const db = yield call(firebase.initializeApp, {
    databaseURL: 'https://marx-for-cats.firebaseio.com',
    serviceAccount: 'firebase-key.json'
  })

  const ref = firebase.database().ref('/records')
  const snap = yield call([ref, ref.once], 'value')
  const data = snap.val()

  yield put(videos.updateData({ data: _.get(data, 'videos', {}) }))
  yield put(updateSessionData({ data: _.get(data, 'pages', {}) }))
}

export function * handleUpdateSessionTime (action) {
  yield put(updateSessionTime(action.payload))

  const sessionTime = yield select(getSessionTime)
  const location = yield select(analytics.getLocation)

  yield call(analytics.trackPageAttention, { seconds: Math.floor(sessionTime / 1000), name: location.pathname })
}

// ------------------------------------
// Saga Watchers
// ------------------------------------
export function * sagas () {
  yield all([
    takeLatest(MOUNT_REQUESTED, mount),
    takeLatest(UPDATE_SESSION_TIME_REQUESTED, handleUpdateSessionTime)
  ])
}
