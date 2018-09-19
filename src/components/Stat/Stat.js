import React from 'react'
import PropTypes from 'prop-types'
import Duration from 'components/Duration/Duration'
import './Stat.scss'

class Stat extends React.Component {
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
            ? <Duration className='Stat__average' seconds={average} />
            : null
          }
          <Duration className='Stat__cat' seconds={cat} />
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
