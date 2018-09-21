import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as app from 'modules/app'
import * as videos from 'modules/videos'
import Stat from 'components/Stat/Stat'
import About from 'components/About/About'
import Duration from 'components/Duration/Duration'
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
  render () {
    const { isExpanded, sessionTime, updateIsExpanded, visibleVideo, watchedVideo } = this.props

    const className = [
      'Footer',
      isExpanded ? 'Footer--expanded' : null
    ].join(' ')

    return (
      <footer className={className}>
        <div className='Header' onClick={() => updateIsExpanded(!isExpanded)}>
          <i className='fas fa-clock' />
          <Duration className='sessionTime' value={sessionTime} />
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
