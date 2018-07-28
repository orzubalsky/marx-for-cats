import React from 'react'
import PropTypes from 'prop-types'
import './Container.scss'

class Container extends React.Component {
  render () {
    const { children, className, isGrid, isHorizontal, isVertical, ratio } = this.props

    const containerClassNames = [
      className,
      'Container',
      ratio > 0 ? `Container--${Math.floor(ratio * 100)}` : null
    ].join(' ')

    const innerClassNames = [
      'Container__inner',
      isHorizontal ? 'Container__inner--horizontal' : null,
      isVertical ? 'Container__inner--vertical' : null,
      isGrid ? 'col-grid' : null
    ].join(' ')

    return (
      <div className={containerClassNames}>
        <div className={innerClassNames}>
          {children}
        </div>
      </div>
    )
  }
}

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isGrid: PropTypes.bool.isRequired,
  isHorizontal: PropTypes.bool,
  isVertical: PropTypes.bool,
  ratio: PropTypes.number
}

Container.defaultProps = {
  className: '',
  isGrid: false
}

export default Container
