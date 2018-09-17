import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import * as app from 'modules/app'
import * as videos from 'modules/videos'
import Stat from 'components/Stat/Stat'
import About from 'components/About/About'
import './Footer.scss'

const mapDispatchToProps = {
  updateIsExpanded: isFooterExpanded => app.update({ isFooterExpanded }),
}

const mapStateToProps = state => {
  return {
    watchedVideo: videos.getPlaying(state),
    visibleVideo: videos.getVisible(state),
    isExpanded: app.getProp(state, 'isFooterExpanded'),
    sessionTime: app.getSessionTime(state)
  }
}

class Footer extends React.Component {
  withLeadingZero (number) {
    return number < 10 ? `0${number}` : number
  }

  formatNumber (number) {
    const duration = moment.duration(number * 1000)
    return `${this.withLeadingZero(duration.minutes())}:${this.withLeadingZero(duration.seconds())}`
  }

  render () {
    const { isExpanded, sessionTime, updateIsExpanded, visibleVideo, watchedVideo } = this.props

    const className = [
      'Footer',
      isExpanded ? 'Footer--expanded' : null
    ].join(' ')

    return (
      <footer className={className}>
        <div className='Header' onClick={() => updateIsExpanded(!isExpanded)}>
          <i className='far fa-clock' />
          <span className='sessionTime'>
            {this.formatNumber(sessionTime)}
          </span>
          <a className='toggle'>
            { isExpanded
              ? '-'
              : '+'
            }
          </a>
        </div>
        <About />
      </footer>
    )
  }
}

Footer.propTypes = {
  sessionTime: PropTypes.number,
  isExpanded: PropTypes.bool.isRequired,
  updateIsExpanded: PropTypes.func.isRequired
}

Footer.defaultProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
