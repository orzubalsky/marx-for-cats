import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as app from 'modules/app'
import Stat from 'components/Stat/Stat'
import About from 'components/About/About'
import './Footer.scss'

const mapDispatchToProps = {
  updateIsExpanded: isFooterExpanded => app.update({ isFooterExpanded }),
}

const mapStateToProps = state => {
  return {
    isExpanded: app.getProp(state, 'isFooterExpanded'),
    sessionTime: app.getSessionTime(state)
  }
}

class Footer extends React.Component {
  render () {
    const { isExpanded, sessionTime, updateIsExpanded } = this.props

    const className = [
      'Footer',
      isExpanded ? 'Footer--expanded' : null
    ].join(' ')

    return (
      <footer className={className}>
        <a
          className='Footer__toggle'
          onClick={() => updateIsExpanded(!isExpanded)}
        >
          { isExpanded ? '-' : '+' }
        </a>
        <div className='Stats'>
          <Stat
            name='Watching Affective Labour'
            average={30}
            cat={sessionTime}
          />
          <Stat
            name='Looking at Affective Labour'
            cat={sessionTime}
          />
          <Stat
            name='Time spent with cats'
            average={30}
            cat={sessionTime}
          />
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
