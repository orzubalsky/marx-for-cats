import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class Duration extends React.Component {
  withLeadingZero (number) {
    return number < 10 ? `0${number}` : number
  }

  formatNumber (number) {
    const duration = moment.duration(number * 1000)
    return `${this.withLeadingZero(duration.minutes())}:${this.withLeadingZero(duration.seconds())}`
  }

  render () {
    return (
      <span className={`Duration ${this.props.className}`}>
        {this.formatNumber(this.props.seconds)}
      </span>
    )
  }
}

Duration.propTypes = {
  className: PropTypes.string.isRequired,
  seconds: PropTypes.number.isRequired
}

Duration.defaultProps = {
  className: '',
  seconds: 0
}

export default Duration
