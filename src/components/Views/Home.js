import React from 'react'
import PropTypes from 'prop-types'
import VideoItem from 'components/VideoItem/VideoItem'
import AdItem from 'components/AdItem/AdItem'
import './Home.scss'

class Home extends React.Component {
  ComponentDidMount () {

  }

  render () {
    return (
      <div className='Home'>
        <VideoItem name='Affective Labour' />
        <VideoItem name={`Art's Commodity Status`} />
        <VideoItem name='Use Value' />
        <VideoItem name='Spatial Fix' />
        <VideoItem name='Wage Labour' />
      </div>
    )
  }
}

Home.propTypes = {
}

Home.defaultProps = {
}

export default Home
