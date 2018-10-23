import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as videos from 'modules/videos'
import Video from 'components/Video/Video'
import Stat from 'components/Stat/Stat'
import { randomNumber } from 'utils/common'
import './VideoItem.scss'

const mapDispatchToProps = {}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps

  return {
    averageVisibility: videos.getAverage(state, id, 'attention') * 1000,
    averageWatch: videos.getAverage(state, id, 'watch') / 100,
    isVisible: videos.getIsVisible(state, id),
    isPlaying: videos.getIsPlaying(state, id),
    percent: videos.getPercent(state, id),
    visibilityTime: videos.getVisibilityTime(state, id)
  }
}

class VideoItem extends React.Component {
  render () {
    const { averageVisibility, averageWatch, className, percent, id, isPlaying, isVisible, name, slug, visibilityTime } = this.props

    const classNames = [
      className,
      'VideoItem'
    ].join(' ')

    return (
      <div className={classNames} id={slug}>
        <div className='VideoItem__inner'>
          <h2 className='VideoItem__name'>
            <Link to={`/video/${slug}`}>
              {name}
            </Link>
          </h2>
          <div className='VideoItem__videoContainer'>
            <Video id={id} />
          </div>
          <div className='VideoItem__stats'>
            <Stat
              average={averageVisibility}
              cat={visibilityTime}
              className='Stat--visibility'
              iconName='dot'
              isVisible={isVisible}
              isPlaying={isPlaying}
              type='duration'
              wait={randomNumber(1200, 0)}
            />
            <Stat
              average={averageWatch}
              cat={percent}
              className='Stat--watched'
              iconName='far fa-clock'
              isVisible={isVisible}
              isPlaying={isPlaying}
              type={'percent'}
              wait={0}
            />
          </div>
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
