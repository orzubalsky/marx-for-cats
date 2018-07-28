import React from 'react'
import PropTypes from 'prop-types'
import FA from 'react-fontawesome'
import './Loader.scss'

export class Loader extends React.Component {
  render () {
    if (this.props.isLoaded) {
      return (
        <div className={`Loader--loaded ${this.props.className}`}>
          {this.props.children}
        </div>
      )
    }

    return (
      <div className='Loader'>
        <div className='spinner-container'>
          <FA name='spinner' className='fa fa-3x fa-spin' />
          <div className='spinner-label'>{this.props.message}</div>
        </div>
      </div>
    )
  }
}

Loader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isLoaded: PropTypes.bool.isRequired,
  message: PropTypes.string
}

Loader.defaultProps = {
  isLoaded: false
}

export default Loader
