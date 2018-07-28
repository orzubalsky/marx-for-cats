import React from 'react'
import PropTypes from 'prop-types'
import './Video.scss'

class Video extends React.Component {
  render () {
    const { className, isActive } = this.props

    const classNames = [
      className,
      'Video',
      !isActive ? 'Video--inactive' : null
    ].join(' ')

    return (
      <div className={classNames}>
        <div className='Video__inner' />
      </div>
    )
  }
}

Video.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool.isRequired
}

Video.defaultProps = {
  className: '',
  isActive: true
}

export default Video
