import React from 'react'
import PropTypes from 'prop-types'
import Video from 'components/Video/Video'
import Datum from 'components/Datum/Datum'
import './VideoItem.scss'

class VideoItem extends React.Component {
  render () {
    const { className, isActive } = this.props

    const classNames = [
      className,
      'VideoItem',
      !isActive ? 'VideoItem--inactive' : null
    ].join(' ')

    return (
      <div className={classNames}>
        <h2 className='VideoItem__name'>01 // Commodity</h2>
        <Video />
        <div className='VideoItem__description'>
          <p>
            In On The Catpitalist Mode of Production, an unnamed cat and New York based visual artists
            Caroline Woolard and Or Zubalsky ask critical theorist Leigh Claire La Berge to explain
            keywords in contemporary capitalism.
          </p>          
        </div>
        <div className='VideoItem__data'>
          <Datum width='50%' labelWidth='50%' valueWidth='50%' label='Views' value='34' />
          <Datum width='50%' labelWidth='50%' valueWidth='50%' label='Duration' value='3:03' />
          <Datum width='100%' labelWidth='50%' valueWidth='50%' label='Most Popular In' value='New York City' />
          <Datum width='100%' labelWidth='75%' valueWidth='25%' label='Frequently Enjoyed at' value='5:00pm' />
          <Datum width='100%' labelWidth='25%' valueWidth='75%' label='So' value='You are late' />
          <Datum width='100%' labelWidth='100%' label='No other cats are watching' />
          <Datum width='100%' labelWidth='50%' valueWidth='50%' label='When this video was shot' value='It was chilly' />
        </div>
      </div>
    )
  }
}

VideoItem.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool.isRequired
}

VideoItem.defaultProps = {
  className: '',
  isActive: true
}

export default VideoItem
