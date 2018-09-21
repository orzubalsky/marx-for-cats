import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as videos from 'modules/videos'
import Video from 'components/Video/Video'
import Duration from 'components/Duration/Duration'
import Stat from 'components/Stat/Stat'
import Percentage from 'components/Percentage/Percentage'
import './VideoItem.scss'

const mapDispatchToProps = {}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps

  return {
    isVisible: videos.getIsVisible(state, id),
    isPlaying: videos.getIsPlaying(state, id),
    percent: videos.getPercent(state, id),
    visibilityTime: videos.getVisibilityTime(state, id)
  }
}

class VideoItem extends React.Component {
  randomNumber (max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  render () {
    const { className, percent, id, isPlaying, isVisible, name, visibilityTime } = this.props

    const classNames = [
      className,
      'VideoItem'
    ].join(' ')

    return (
      <div className={classNames}>
        <div className='VideoItem__inner'>
          <div className='VideoItem__stats'>
            <Stat
              average={300}
              cat={visibilityTime}
              className='Stat--visibility'
              iconName='dot'
              isVisible={isVisible}
              isPlaying={isPlaying}
              type='duration'
              wait={this.randomNumber(1200, 0)}
            />
            <Stat
              average={0.5}
              cat={percent}
              className='Stat--watched'
              iconName='far fa-clock'
              isVisible={isVisible}
              isPlaying={isPlaying}
              type={'percent'}
              wait={0}
            />
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
