import _ from 'lodash'

export const log = (...args) => {
  const logArgs = _.map({ ...args }, (argument, i) => i == 0 ? `[APP] ${argument}` : argument)

  return (__DEV__ || __STG__) &&
    window.console &&
    console.log &&
    console.log.apply(this, logArgs)
}

export const actionCreator = (type, ...argNames) => {
  return function (...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}
