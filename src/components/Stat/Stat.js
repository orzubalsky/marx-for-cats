import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import './Stat.scss'

class Stat extends React.Component {
  withLeadingZero (number) {
    return number < 10 ? `0${number}` : number
  }

  formatNumber (number) {
    const duration = moment.duration(number * 1000)
    return `${this.withLeadingZero(duration.minutes())}:${this.withLeadingZero(duration.seconds())}`
  }

  render () {
    const className = [
      'Stat',
      this.props.className
    ].join(' ')

    const { name, average, cat } = this.props

    return (
      <div className={className}>
        <div className='Stat__name'>
          <span>
            {name}
          </span>
        </div>
        <div className='Stat__value'>
          { average
            ? <span className='Stat__average'>
              {this.formatNumber(average)}
            </span>
            : null
          }
          <span className='Stat__cat'>
            {this.formatNumber(cat)}
          </span>
        </div>
      </div>
    )
  }
}

Stat.propTypes = {
  average: PropTypes.number,
  cat: PropTypes.number,
  className: PropTypes.string,
  name: PropTypes.string.isRequired
}

Stat.defaultProps = {
}

export default Stat
