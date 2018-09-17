import _ from 'lodash'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { actionCreator } from 'utils/common.js'

// ------------------------------------
// Action Type Constants
// ------------------------------------
const MODULE = 'VIDEOS'
const UPDATE = `${MODULE}/UPDATED`
const UPDATE_STATUS = `${MODULE}/STATUS/UPDATED`
const UPDATE_TIME = `${MODULE}/TIME/UPDATED`
const UPDATE_VISIBILITY = `${MODULE}/VISIBILITY/UPDATED`
const UPDATE_VISIBILITY_TIMES = `${MODULE}/VISIBILITY_TIMES/UPDATED`

// ------------------------------------
// Action Creators
// ------------------------------------
export const update = actionCreator(UPDATE, 'payload')
export const updateStatus = actionCreator(UPDATE_STATUS, 'payload')
export const updateTime = actionCreator(UPDATE_TIME, 'payload')
export const updateVisibility = actionCreator(UPDATE_VISIBILITY, 'payload')
export const updateVisibilityTimes = actionCreator(UPDATE_VISIBILITY_TIMES, 'payload')

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
  [UPDATE_STATUS] : (state, action) => {
    const { id, status } = action.payload

    return {
      ...state,
      items: {
        ...state.items,
        [ id ] : { ...state.items[id], status }
      }
    }
  },
  [UPDATE_TIME] : (state, action) => {
    const { id, seconds } = action.payload

    const currentTime = seconds
    const previousTime = _.get(state.items[id], 'currentTime', 0)
    const timeDiff = currentTime - previousTime
    const elapsedTime = Math.abs(timeDiff) < 1
     ? _.get(state.items[id], 'elapsedTime', 0) + timeDiff
      : _.get(state.items[id], 'elapsedTime', 0)

    return {
      ...state,
      items: {
        ...state.items,
        [ id ] : { ...state.items[id], currentTime, previousTime, elapsedTime }
      }
    }
  },
  [UPDATE_VISIBILITY] : (state, action) => {
    const { id, isVisible } = action.payload

    return {
      ...state,
      items: {
        ...state.items,
        [ id ] : { ...state.items[id], isVisible }
      }
    }
  },
  [UPDATE_VISIBILITY_TIMES] : (state, action) => {
    return {
      ...state,
      items: _.mapValues(state.items, video => video.isVisible ? ({ ...video, visibilityTime: _.get(video, 'visibilityTime', 0) + 1 }) : video)
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  items: {
    276037638: {
      id: 276037638,
      name: "Art's Commodity Status"
    },
    290188845: {
      id: 290188845,
      name: "Use Value versus Exchange Value"
    },
    290198493: {
      id: 290198493,
      name: "Work versus Labor"
    },
    290209146: {
      id: 290209146,
      name: "A Cat’s Commodity Status"
    },
    290216480: {
      id: 290216480,
      name: "Affective Labor and the Real Subsumption of Labor to Capital"
    },
    290267616: {
      id: 290267616,
      name: "Commodity (defined)"
    },
    290275489: {
      id: 290275489,
      name: "Spatial Fix"
    },
    290284030: {
      id: 290284030,
      name: "Commodities’ Sentimental Narratives"
    },
    290293828: {
      id: 290293828,
      name: "Cat Food’s Commodity Status"
    },
    290308435: {
      id: 290308435,
      name: "Alienated Labor versus Really Free Work"
    },
  }
}

export const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

// ------------------------------------
// Selectors
// ------------------------------------
export const getModule = state => state.app.videos
export const getProp = (state, prop, defaultVal) => _.get(getModule(state), prop, defaultVal)
export const getItems = state => _.chain(getProp(state, 'items', []))
  .sortBy('name')
  .value()
export const getPlaying = state => _.find(getItems(state), video => video.status === 'playing')
export const getVisible = state => _.find(getItems(state), video => video.isVisible)
export const getItem = (state, id) => _.find(getItems(state), item => item.id === id)
export const getItemProp = (state, id, prop, defaultValue) => _.get(getItem(state, id), prop, defaultValue)
export const getStatus = (state, id) => getItemProp(state, id, 'status', 'stopped')
export const getElapsedTime = (state, id) => getItemProp(state, id, 'elapsedTime', 0)
export const getVisibilityTime = (state, id) => getItemProp(state, id, 'visibilityTime', 0)

// ------------------------------------
// Sagas
// ------------------------------------

// ------------------------------------
// Saga Watchers
// ------------------------------------
export function * sagas () {
  yield all({
  })
}
