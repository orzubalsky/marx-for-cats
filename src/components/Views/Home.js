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
        <VideoItem />
        <AdItem />
      </div>
    )
  }
}

Home.propTypes = {
}

Home.defaultProps = {
}

export default Home
