import { all, fork } from 'redux-saga/effects'
import * as analytics from 'modules/analytics'
import * as app from 'modules/app'
import * as navigation from 'modules/navigation'
import * as videos from 'modules/videos'

export default function * root () {
  yield all({
    analytics: fork(analytics.sagas),
    app: fork(app.sagas),
    navigation: fork(navigation.sagas),
    videos: fork(videos.sagas)
  })
}
