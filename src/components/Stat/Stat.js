import React from 'react'
import PropTypes from 'prop-types'
import Duration from 'components/Duration/Duration'
import Percentage from 'components/Percentage/Percentage'
import './Stat.scss'

class Stat extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isRendered : false }
  }

  componentWillMount () {
    this.timeout = setTimeout(this.show.bind(this), this.props.wait)
  }

  show () {
    this.setState({ isRendered : true })
  }

  render () {
    const { average, cat, iconName, isVisible, isPlaying, type } = this.props
    const { isRendered } = this.state

    const className = [
      'Stat',
      this.props.className,
      isRendered ? 'Stat--rendered' : null,
      isVisible ? 'Stat--isVisible' : null,
      isPlaying ? 'Stat--isPlaying' : null,
      type === 'percent' ? 'Stat--percent' : 'Stat--duration'
    ].join(' ')

    const Value = type === 'percent' ? Percentage : Duration

    return (
      <div className={className}>
        <div className='average'>
          <span className={iconName} />
          <Value value={average} />
        </div>
        <div className='cat'>
          <span className={iconName} />
          <Value value={cat} />
        </div>
      </div>
    )
  }
}

Stat.propTypes = {
  average: PropTypes.number,
  cat: PropTypes.number,
  className: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  wait: PropTypes.number.isRequired
}

Stat.defaultProps = {
  iconName: 'fas fa-eye',
  isRequired: false,
  isPlaying: false,
  type: 'duration'
}

export default Stat
