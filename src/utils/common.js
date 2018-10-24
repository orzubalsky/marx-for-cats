import _ from 'lodash'

export const randomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const averageEventData = (data, eventType) => {
  if (!_.has(data, eventType)) return 0

  const invertedData = _.invert(data[eventType])

  const total = _.chain(invertedData)
    .pickBy((value, key) => key !== 'undefined')
    .map((seconds, sum) => seconds * sum)
    .reduce((sum, value) => sum + value)
    .value()

  const average = total / _.size(invertedData)

  return parseFloat(average.toFixed(2))
}

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

export const timestamp = () => Math.round((new Date()).getTime() / 1000)
