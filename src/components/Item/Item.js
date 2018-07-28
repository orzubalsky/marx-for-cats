import React from 'react'
import PropTypes from 'prop-types'
import Container from 'components/Container/Container'
import './Item.scss'

class Item extends React.Component {
  render () {
    const { children, className, header, isActive, label, ratio } = this.props

    const classNames = [
      className,
      'Item',
      !isActive ? 'Item--inactive' : null
    ].join(' ')

    return (
      <Container className={classNames} ratio={ratio}>
        <div className='Item__content'>
          {label ? <h3 className='Item__label'>{`// ${label}`}</h3> : null}
          {header ? <h2 className='Item__header'>{header}</h2> : null}
          {children}
        </div>
      </Container>
    )
  }
}

Item.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  header: PropTypes.string,
  isActive: PropTypes.bool.isRequired,
  label: PropTypes.string,
  ratio: PropTypes.number
}

Item.defaultProps = {
  className: '',
  isActive: true
}

export default Item
