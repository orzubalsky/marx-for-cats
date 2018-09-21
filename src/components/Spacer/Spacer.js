import React from 'react'
import PropTypes from 'prop-types'
import VisibilitySensor from 'react-visibility-sensor'
import Dot from 'components/Dot/Dot'
import './Spacer.scss'

class Spacer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isVisible: false,
      isRendered : false
    }
  }

  componentWillMount () {
    this.timeout = setTimeout(this.show.bind(this), this.props.wait)
  }

  show () {
    this.setState({ isRendered : true })
  }

  render () {
    const { isRendered, isVisible } = this.state

    const className = [
      'Spacer',
      isRendered ? 'Spacer--rendered' : null,
      isVisible ? 'Spacer--visible' : null
    ].join(' ')

    return (
      <VisibilitySensor
        scrollCheck
        scrollThrottle={100}
        intervalDelay={300}
        onChange={isVisible => this.setState({ isVisible })}
        partialVisibility
      >
        <div className={className}>
          <h2 />
          <div className='Spacer__ratio'>
            <Dot isVisible={isVisible} isRendered={isRendered} />
          </div>
          <div className='Spacer__bottom' />
        </div>
      </VisibilitySensor>
    )
  }
}

Spacer.propTypes = {
  wait: PropTypes.number.isRequired
}

Spacer.defaultProps = {
}

export default Spacer
