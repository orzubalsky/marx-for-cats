import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class Duration extends React.Component {
  withLeadingZero (number) {
    return number < 10 ? `0${number}` : number
  }

  withLeadingZeros (number) {
    return number < 10
      ? `00${number}`
      : number < 100
        ? `0${number}`
        : number
  }

  formatNumber (number) {
    const duration = moment.duration(number)
    return `${this.withLeadingZero(duration.minutes())}:${this.withLeadingZero(duration.seconds())}.${this.withLeadingZeros(duration.milliseconds())}`
  }

  render () {
    return (
      <span className={`Duration ${this.props.className}`}>
        {this.formatNumber(this.props.value)}
      </span>
    )
  }
}

Duration.propTypes = {
  className: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

Duration.defaultProps = {
  className: '',
  value: 0
}

export default Duration
