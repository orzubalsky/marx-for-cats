import React from 'react'
import { Route } from 'react-router'
import PropTypes from 'prop-types'

export class PageLayout extends React.Component {
  render () {
    const Component = this.props.Component
    return (
      <Route {...this.props} render={matchProps => (
        <Component {...matchProps} {...this.props} />
      )} />
    )
  }
}

PageLayout.propTypes = {
  Component: PropTypes.func
}

export default PageLayout
