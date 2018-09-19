import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as videos from 'modules/videos'
import Video from 'components/Video/Video'
import Duration from 'components/Duration/Duration'
import './VideoItem.scss'

const mapDispatchToProps = {}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps

  return {
    status: videos.getStatus(state, id),
    elapsedTime: videos.getElapsedTime(state, id),
    visibilityTime: videos.getVisibilityTime(state, id)
  }
}

class VideoItem extends React.Component {
  render () {
    const { className, elapsedTime, id, name, status, visibilityTime } = this.props

    const classNames = [
      className,
      'VideoItem',

    ].join(' ')

    return (
      <div className={classNames}>
        <div className='VideoItem__inner'>
          <div className='VideoItem__stats'>
            <div className='VideoItem__stat'>
              <i className='fas fa-eye' />
              <Duration seconds={visibilityTime} />
            </div>
            <div className='VideoItem__stat'>
              <i className='far fa-clock' />
              <Duration seconds={elapsedTime} />
            </div>
          </div>
          <div className='VideoItem__videoContainer'>
            <Video id={id} />
          </div>
          <h2 className='VideoItem__name'>
            {name}
          </h2>
        </div>
      </div>
    )
  }
}

VideoItem.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number.isRequired,
  name: PropTypes.string
}

VideoItem.defaultProps = {
  className: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoItem)
