import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Duration from 'components/Duration/Duration'
import Spacer from 'components/Spacer/Spacer'
import { randomNumber } from 'utils/common'
import './Countdown.scss'

const mapDispatchToProps = {
}

const mapStateToProps = state => {
  return {
  }
}

class Countdown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      target: moment('2018-10-24 09:00')
    }
  }

  componentDidMount () {
    this.interval = setInterval(this.updateCountdown.bind(this), 1000)
  }

  componentWillUnMount () {
    clearInterval(this.interval)
  }

  updateCountdown () {
    const eventTime = this.state.target.unix()
    const currentTime = moment().unix()
    const duration = (eventTime - currentTime) * 1000

    this.setState({ duration })
  }

  render () {
    return (
      <div className='Countdown'>
        <div className='Countdown__background'>
          {_.map(_.range(24), n => <Spacer key={`space-${n}`} wait={randomNumber(2500, 0)} />)}
        </div>
        <div className='Countdown__content'>
          <h1>Marx for Cats</h1>
          <h2>is coming in</h2>
          <Duration className='Countdown__down' isLong value={this.state.duration} />
        </div>
      </div>
    )
  }
}

Countdown.propTypes = {
}

Countdown.defaultProps = {
}

export default Countdown
