import _ from 'lodash'
import url from 'url'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { actionCreator, log, timestamp } from 'utils/common'

export const categories = {
  AD: 'Ad',
  APP: 'App',
  CHAPTER: 'Chapter',
  VIDEO: 'Video'
}

export const actions = {
  VIEW: 'View',
  PLAY: 'Play'
}

// ------------------------------------
// Action Type Constants
// ------------------------------------
const MODULE = 'ANALYTICS'
const CHAPTER_VIEW_REQUESTED = `${MODULE}/CHAPTER_VIEW/REQUESTED`

// ------------------------------------
// Action Creators
// ------------------------------------
export const chapterViewRequested = actionCreator(CHAPTER_VIEW_REQUESTED, 'payload', 'options')

// ------------------------------------
// Action Handlers
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------

// ------------------------------------
// Selectors
// ------------------------------------
export const getLocation = state => _.get(state, 'router.location')

// ------------------------------------
// Sagas
// ------------------------------------
export function * handleChapterView (action) {
  const { name } = action.payload
  yield call(track, { category: categories.CHAPTER, action: actions.VIEW, label: name })
}

export function * track (params) {
    const location = yield select(getLocation)
    const { category, action, label } = params
    
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
  yield all([
    takeEvery(CHAPTER_VIEW_REQUESTED, handleChapterView),
  ])
}
