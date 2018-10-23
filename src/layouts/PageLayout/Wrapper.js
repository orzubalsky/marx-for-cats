import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as app from 'modules/app'
import * as videos from 'modules/videos'
import PageLayout from 'layouts/PageLayout'
import Home from 'components/Views/Home'
import VideoView from 'components/Views/VideoView'
import Countdown from 'components/Views/Countdown'
import './PageLayout.scss'

const mapDispatchToProps = {
  mount: () => app.mountRequested(),
  updateSessionTime: () => app.updateSessionTimeRequested(),
  updateVisibilityTimes: frameTime => videos.updateVisibilityTimesRequested({ frameTime })
}

const mapStateToProps = state => {
  return {
    frameTime: app.getFrameTime(state)
  }
}

export class Wrapper extends React.Component {
  componentWillMount () {
    const { mount, updateSessionTime, updateVisibilityTimes } = this.props

    mount()

    if (!this.interval) {
      this.interval = setInterval(() => {
        updateSessionTime()
        updateVisibilityTimes(this.props.frameTime)
      }, this.props.frameTime)
    }

    if (this.props.location.pathname !== '/') {
      const slug = _.last(this.props.location.pathname.split('/'))
      if (slug && slug !== '/') {
        setTimeout(() => { this.scrollToElement(slug) }, 2000)
      }
    }
  }

  componentWillUpdate (prevProps) {
    const previousPathname = prevProps.location.pathname
    const currentPathname = this.props.location.pathname

    if (previousPathname !== currentPathname) {
      const slug = _.last(previousPathname.split('/'))
      slug && slug !== '/' && this.scrollToElement(slug)
    }
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  scrollToElement (slug) {
    const element = document.querySelector(`#${slug}`)
    if (element) {
      element.scrollIntoView()
    }
  }

  render () {
    return (
      <div className='App'>
        <PageLayout exact path='/' Component={Countdown} />
        <PageLayout exact path='/videos' Component={Home} />
        <PageLayout exact path='/video/:slug' Component={VideoView} />
      </div>
    )
  }
}

Wrapper.propTypes = {
  location: PropTypes.object,
  mount: PropTypes.func.isRequired,
  updateSessionTime: PropTypes.func.isRequired,
  updateVisibilityTimes: PropTypes.func.isRequired
}

Wrapper.defaultProps = {}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wrapper))
