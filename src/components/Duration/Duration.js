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
    const short =  `${this.withLeadingZero(duration.minutes())}:${this.withLeadingZero(duration.seconds())}`
    return this.props.isLong
      ? `${this.withLeadingZero(duration.days())}:${this.withLeadingZero(duration.hours())}:${short}`
      : `${short}.${this.withLeadingZeros(duration.milliseconds())}`
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
  value: PropTypes.number.isRequired,
  isLong: PropTypes.bool.isRequired,
  isWithMs: PropTypes.bool.isRequired
}

Duration.defaultProps = {
  className: '',
  isLong: false,
  isWithMs: true,
  value: 0
}

export default Duration
