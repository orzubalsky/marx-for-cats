import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import PageLayoutWrapper from 'layouts/PageLayoutWrapper'
import './reflex.scss'
import './App.scss'

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <PageLayoutWrapper />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
