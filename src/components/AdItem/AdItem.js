import React from 'react'
import PropTypes from 'prop-types'
import Video from 'components/Video/Video'
import Datum from 'components/Datum/Datum'
import './AdItem.scss'

class AdItem extends React.Component {
  render () {
    const { className, isActive } = this.props

    const classNames = [
      className,
      'AdItem',
      !isActive ? 'AdItem--inactive' : null
    ].join(' ')

    return (
      <div className={classNames}>
        <h2 className='AdItem__name'>Ad // Look</h2>
        <div className='AdItem__ad' />
        <div className='AdItem__data'>
          <Datum width='50%' labelWidth='50%' valueWidth='50%' label='Views' value='34' />
          <Datum width='50%' labelWidth='50%' valueWidth='50%' label='Revenue' value='$0.00051' />
          <Datum width='100%' labelWidth='50%' valueWidth='50%' label='You saw this for' value='3 seconds' />
        </div>
      </div>
    )
  }
}

AdItem.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool.isRequired
}

AdItem.defaultProps = {
  className: '',
  isActive: true
}

export default AdItem
