import _ from 'lodash'
import url from 'url'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { actionCreator, log, timestamp } from 'utils/common'

export const categories = {
  AD: 'Ad',
  APP: 'App',
  PAGE: 'Page',
  VIDEO: 'Video'
}

export const actions = {
  VIEW: 'View',
  PLAY: 'Play',
  WATCH: percent => `Watch-${percent}%`,
  TIME: seconds => `Time-${seconds}`,
  ATTENTION: seconds => `Attention-${seconds}`
}

// ------------------------------------
// Action Type Constants
// ------------------------------------
const MODULE = 'ANALYTICS'

// ------------------------------------
// Action Creators
// ------------------------------------

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isEnabled: false
}

export const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
// ------------------------------------
// Selectors
// ------------------------------------
export const getModule = state => state.analytics
export const getProp = (state, prop, defaultVal) => _.get(getModule(state), prop, defaultVal)
export const getLocation = state => _.get(state, 'router.location')
export const getIsEnabled = state => getProp(state, 'isEnabled')

// ------------------------------------
// Sagas
// ------------------------------------
export function * trackVideoPlay ({ name }) {
  yield call(track, { category: categories.VIDEO, action: actions.PLAY, label: name })
}

export function * trackVideoWatch ({ name, percent, seconds }) {
  if (percent * 100 % 1 === 0) {
    yield call(track, { category: categories.VIDEO, action: actions.WATCH(percent * 100), label: name })
  }

  if (seconds % 10 === 0) {
    yield call(track, { category: categories.VIDEO, action: actions.TIME(seconds), label: name })
  }
}

export function * trackVideoAttention ({ name, isVisible, seconds }) {
  if (isVisible && seconds % 10 === 0) {
    yield call(track, { category: categories.VIDEO, action: actions.ATTENTION(seconds), label: name })
  }
}

export function * trackPageAttention ({ name, seconds }) {
  if (seconds % 25 === 0) {
    yield call(track, { category: categories.PAGE, action: actions.ATTENTION(seconds), label: name })
  }
}

export function * track (params) {
  const isEnabled = yield select(getIsEnabled)

  if (!isEnabled) return

  const location = yield select(getLocation)
  const { category, action, label } = params

  log(category, action, label, location.pathname)

  // gtag is a global variable
  gtag('event', category, {
    'event_category': category,
    'event_action' : action,
    'event_label': label,
    'page_path': location.pathname
  })
}

export function * trackLocation (payload) {
  const location = yield select(getLocation)

  // google analytics page view
  const gaId = 'UA-11810862-13'

  yield call(gtag, 'config', gaId, { 'page_path': location.pathname })
}

// ------------------------------------
// Saga Watchers
// ------------------------------------
export function * sagas () {
  yield all([])
}
