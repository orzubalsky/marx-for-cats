import React from 'react'
import PropTypes from 'prop-types'
import './About.scss'

class About extends React.Component {
  render () {
    return (
      <div className='About'>
        <div className='About__description'>
          <p>
            Cats are looking.
          </p>
        </div>
        <div className='About__credit'>
          <p>
            By Leigh Claire La Berge, Caroline Woolard, and Or Zubalsky.<br />
            Get in touch at <a href="mailto:marxforcats@gmail.com">marxforcats@gmail.com</a>
          </p>
        </div>
      </div>
    )
  }
}

About.propTypes = {
}

About.defaultProps = {
}

export default About
