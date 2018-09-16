import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as app from 'modules/app'
import PageLayout from 'layouts/PageLayout'
import Home from 'components/Views/Home'
import Footer from 'components/Footer/Footer'
import './PageLayout.scss'

const mapDispatchToProps = {
  mount: () => app.mountRequested(),
  updateSessionTime: () => app.updateSessionTime()
}

const mapStateToProps = state => {
  return {}
}

export class Wrapper extends React.Component {
  componentWillMount () {
    this.props.mount()
    this.interval = setInterval(this.props.updateSessionTime, 1000)
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
        <PageLayout exact path='/' Component={Home} />
        <Footer />
      </div>
    )
  }
}

Wrapper.propTypes = {
  location: PropTypes.object,
  mount: PropTypes.func.isRequired,
  updateSessionTime: PropTypes.func.isRequired
}

Wrapper.defaultProps = {}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wrapper))
