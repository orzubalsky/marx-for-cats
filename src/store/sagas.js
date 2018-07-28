import { all, fork } from 'redux-saga/effects'

import * as app from 'modules/app'
import * as navigation from 'modules/navigation'

export default function * root () {
  yield all({
    app: fork(app.sagas),
    navigation: fork(navigation.sagas)
  })
}
