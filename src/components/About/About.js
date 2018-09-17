import React from 'react'
import PropTypes from 'prop-types'
import './About.scss'

class About extends React.Component {
  render () {
    return (
      <div className='About'>
        <div className='About__description'>
          <p>
            On the Catpitalist Mode of Production seeks a transvaluation of cats in art as art. La Berge, Woolard, and Zubalsky place the concept of art in a longer genealogy of nineteenth-century philosophy and note the crucial moment in which the idealism of art is replaced with the materialism of capitalism. What appears to Zubalsky, Woolard, and La Berge as exciting and critical about art, is in fact a property of capital. This dual genealogy may be traced through the emergence of the cat as both a subject of art and a subject of capital, a critique of art and critique of capital. Stewart Martin rightly suggests that “the semblance of freedom in art is replaced by the semblance of value; the auto-affection of subjectivity or humanity, by the auto-affection of capital.”
          </p>
        </div>
        <div className='About__credit'>
          <p>
            By Caroline Woolard, Leigh Claire La Berge, and Or Zubalsky.<br />
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
