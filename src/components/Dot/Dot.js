import React from 'react'
import PropTypes from 'prop-types'
import './Dot.scss'

class Dot extends React.Component {
  render () {
    const className = [
      'Dot',
      this.props.isRendered ? 'Dot--rendered' : null,
      this.props.isVisible ? 'Dot--visible' : null
    ].join(' ')

    return (
      <span className={className} />
    )
  }
}

Dot.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  isRendered: PropTypes.bool.isRequired
}

Dot.defaultProps = {
  isVisible: false,
  isRendered: false
}

export default Dot
