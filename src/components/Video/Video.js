import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as videos from 'modules/videos'
import Player from '@vimeo/player'
import VisibilitySensor from 'react-visibility-sensor'
import './Video.scss'

const mapDispatchToProps = {
  updateStatus: (id, status) => videos.updateStatusRequested({ id, status }),
  updateTime: (id, seconds, percent) => videos.updateTimeRequested({ id, seconds, percent }),
  updateVisibility: (id, isVisible) => videos.updateVisibility({ id, isVisible })
}

const mapStateToProps = (state, ownProps) => {
  return {
    status: videos.getStatus(state, ownProps.id)
  }
}

class Video extends React.Component {
  componentDidMount () {
    const { id, updateStatus, updateTime } = this.props

    this.player = new Player(`Video-${id}`, {
      id,
      byline: false,
      color: 'ffffff',
      portrait: false,
      title: false
    })

    this.player.on('play', data => { updateStatus(id, 'playing') })
    this.player.on('pause', data => { updateStatus(id, 'paused') })
    this.player.on('timeupdate', data => { updateTime(id, data.seconds, data.percent) })
  }

  render () {
    const { className, id, status, updateVisibility } = this.props

    const classNames = [
      className,
      'Video',
      status === 'playing' ? 'Video--active' : null
    ].join(' ')

    return (
      <VisibilitySensor
        scrollCheck
        scrollThrottle={100}
        intervalDelay={300}
        containment={this.props.containment}
        onChange={isVisible => updateVisibility(id, isVisible)}
        partialVisibility
      >
        <div className={classNames}>
          <div className='Video__inner' id={`Video-${id}`} />
        </div>
      </VisibilitySensor>
    )
  }
}

Video.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number.isRequired,
  updateTime: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired,
  updateVisibility: PropTypes.func.isRequired
}

Video.defaultProps = {
  className: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)
