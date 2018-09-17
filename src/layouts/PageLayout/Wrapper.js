import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as app from 'modules/app'
import * as videos from 'modules/videos'
import PageLayout from 'layouts/PageLayout'
import Home from 'components/Views/Home'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import './PageLayout.scss'

const mapDispatchToProps = {
  mount: () => app.mountRequested(),
  updateSessionTime: () => app.updateSessionTime(),
  updateVisibilityTimes: () => videos.updateVisibilityTimes()
}

const mapStateToProps = state => {
  return {}
}

export class Wrapper extends React.Component {
  componentWillMount () {
    const { mount, updateSessionTime, updateVisibilityTimes } = this.props

    mount()

    if (!this.interval) {
      this.interval = setInterval(() => {
        updateSessionTime()
        updateVisibilityTimes()
      }, 1000)
    }
  }

  componentWillUpdate (prevProps) {
    const previousPathname = prevProps.location.pathname
    const currentPathname = this.props.location.pathname

    if (previousPathname !== currentPathname) {
      window.scrollTo(0, 0)
    }
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return (
      <div className='App'>
        <h1>Marx for Cats</h1>
        <PageLayout exact path='/' Component={Home} />
        <Footer />
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
