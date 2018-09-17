import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as videos from 'modules/videos'
import Player from '@vimeo/player'
import './Video.scss'

const mapDispatchToProps = {
  updateTime: (id, seconds) => videos.updateTime({ id, seconds }),
  updateStatus: (id, status) => videos.updateStatus({ id, status })
}

const mapStateToProps = state => {
  return {}
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
    this.player.on('timeupdate', data => { updateTime(id, data.seconds) })
  }

  render () {
    const { className, id, isActive } = this.props

    const classNames = [
      className,
      'Video',
      !isActive ? 'Video--inactive' : null
    ].join(' ')

    return (
      <div className={classNames}>
        <div className='Video__inner' id={`Video-${id}`} />
      </div>
    )
  }
}

Video.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  updateTime: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired,
}

Video.defaultProps = {
  className: '',
  isActive: true
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)
