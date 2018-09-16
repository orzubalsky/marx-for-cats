import React from 'react'
import PropTypes from 'prop-types'
import Video from 'components/Video/Video'
import Datum from 'components/Datum/Datum'
import './VideoItem.scss'

class VideoItem extends React.Component {
  render () {
    const { className, name, isActive } = this.props

    const classNames = [
      className,
      'VideoItem',
      !isActive ? 'VideoItem--inactive' : null
    ].join(' ')

    return (
      <div className={classNames}>
        <h2 className='VideoItem__name'>{name}</h2>
        <Video />
      </div>
    )
  }
}

VideoItem.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool.isRequired,
  name: PropTypes.string
}

VideoItem.defaultProps = {
  className: '',
  isActive: true
}

export default VideoItem
