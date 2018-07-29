import React from 'react'
import PropTypes from 'prop-types'
import './Datum.scss'

class Datum extends React.Component {
  render () {
    const className = [
      'Datum',
      this.props.className
    ].join(' ')
    
    const { label, labelWidth, value, valueWidth, width } = this.props

    return (
      <div className={className} style={{ width: `calc(${width} - 0px)` }}>
        <div className='Datum__label'  style={{ width: `calc(${labelWidth} - 0px)` }}>
          {label}
        </div>
        {value 
          ? <div className='Datum__value' style={{ width: `calc(${valueWidth} - 0px)` }}>
            {value}
          </div>
          : null
        }
      </div>
    )
  }
}

Datum.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelWidth: PropTypes.string.isRequired,
  value: PropTypes.string,
  valueWidth: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired
}

Datum.defaultProps = {
  labelWidth: '50%',
  valueWidth: '50%',
  width: '100%'
}

export default Datum
