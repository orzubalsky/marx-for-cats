import React from 'react'
import PropTypes from 'prop-types'
import './Header.scss'

class Header extends React.Component {
  render () {
    return (
      <header className='Header'>
        <h1>
          Marx for Cats
        </h1>
      </header>
    )
  }
}

Header.propTypes = {
}

Header.defaultProps = {
}

export default Header
