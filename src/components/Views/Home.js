import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as videos from 'modules/videos'
import VideoItem from 'components/VideoItem/VideoItem'
import AdItem from 'components/AdItem/AdItem'
import './Home.scss'

const mapDispatchToProps = {
}

const mapStateToProps = state => {
  return {
    videos: videos.getItems(state)
  }
}

class Home extends React.Component {
  ComponentDidMount () {

  }

  render () {
    return (
      <div className='Home'>
        {this.props.videos.map(({ id, name }) => <VideoItem key={id} name={name} id={id} />)}
      </div>
    )
  }
}

Home.propTypes = {
  videos: PropTypes.array.isRequired
}

Home.defaultProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
