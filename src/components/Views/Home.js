import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as videos from 'modules/videos'
import VideoItem from 'components/VideoItem/VideoItem'
import Spacer from 'components/Spacer/Spacer'
import { randomNumber } from 'utils/common'
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
        <Spacer wait={randomNumber(1200, 0)} />
        {this.props.videos.map(({ id, name, spacers }) => {
          return [
            <VideoItem key={id} name={name} id={id} />,
            _.map(_.range(spacers), n => <Spacer wait={randomNumber(2500, 0)} />)
          ]
        })}
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
