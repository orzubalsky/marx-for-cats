import React from 'react'
import PropTypes from 'prop-types'

class Percentage extends React.Component {
  withLeadingZero (percent) {
    return percent < 10 ? `0${percent}` : percent
  }

  formatNumber (percent) {
    return this.withLeadingZero((percent * 100).toFixed())
  }

  render () {
    return (
      <span className={`Percentage ${this.props.className}`}>
        {this.formatNumber(this.props.value)}%
      </span>
    )
  }
}

Percentage.propTypes = {
  className: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

Percentage.defaultProps = {
  className: '',
  value: 0
}

export default Percentage
