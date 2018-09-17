import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import * as videos from 'modules/videos'
import Video from 'components/Video/Video'
import Datum from 'components/Datum/Datum'
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
  withLeadingZero (number) {
    return number < 10 ? `0${number}` : number
  }

  formatNumber (number) {
    const duration = moment.duration(number * 1000)
    return `${this.withLeadingZero(duration.minutes())}:${this.withLeadingZero(duration.seconds())}`
  }

  render () {
    const { className, elapsedTime, id, name, status, visibilityTime } = this.props

    const classNames = [
      className,
      'VideoItem',

    ].join(' ')

    return (
      <div className={classNames}>
        <div className='VideoItem__inner'>
          <h2 className='VideoItem__name'>
            <span>
              {name}
            </span>
            <div className='VideoItem__stats'>
              <div className='VideoItem__stat'>
                <i className='fas fa-eye' />
                <span>{this.formatNumber(visibilityTime)}</span>
              </div>
              <div className='VideoItem__stat'>
                <i className='far fa-clock' />
                <span>{this.formatNumber(elapsedTime)}</span>
              </div>
            </div>
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
  name: PropTypes.string
}

VideoItem.defaultProps = {
  className: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoItem)
