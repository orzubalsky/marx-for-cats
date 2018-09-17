import React from 'react'
import PropTypes from 'prop-types'
import Video from 'components/Video/Video'
import Datum from 'components/Datum/Datum'
import './VideoItem.scss'

class VideoItem extends React.Component {
  render () {
    const { className, id, name, isActive } = this.props

    const classNames = [
      className,
      'VideoItem',
      !isActive ? 'VideoItem--inactive' : null
    ].join(' ')

    return (
      <div className={classNames}>
        <div className='VideoItem__inner'>
          <h2 className='VideoItem__name'>
            <span>
              {name}
            </span>
          </h2>
          <div className='VideoItem__videoContainer'>
            <Video id={id} />
          </div>
        </div>
      </div>
    )
  }
}

VideoItem.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  name: PropTypes.string
}

VideoItem.defaultProps = {
  className: '',
  isActive: true
}

export default VideoItem
