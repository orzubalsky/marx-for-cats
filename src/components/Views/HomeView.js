import React from 'react'
import PropTypes from 'prop-types'
import Container from 'components/Container/Container'
import Item from 'components/Item/Item'
import Video from 'components/Video/Video'
import './HomeView.scss'

class HomeView extends React.Component {
  ComponentDidMount () {

  }

  render () {
    return (
      <div className='HomeView grid grid-bleed'>
        <Container className='col-sm-6 col-grid' ratio={4 / 12}>
          <Item className='col-xs-8' label='01' header='Commodity' ratio={4 / 12}>
            <p>
              Some description text about this video. Some description text about this video. Some description text about this video. Some description text about this video.
            </p>
            <Video />
          </Item>
        </Container>
        <Container className='col-sm-6 col-grid' ratio={4 / 12} isHorizontal>
          <Container className='col-xs-12 col-grid' ratio={4 / 12} isGrid isVertical>
            <Item className='col-xs-8' ratio={4 / 12} />
            <Item className='col-xs-4' ratio={4 / 12} isActive={false}>
              <p>12 paws present</p>
            </Item>
          </Container>
          <Item className='col-xs-12' label='02' header='Labor' ratio={4 / 12} />
        </Container>
        <Container className='col-sm-6 col-grid' ratio={4 / 12} isHorizontal>
          <Container className='col-xs-12 col-grid' ratio={4 / 12} isGrid isVertical>
            <Item className='col-xs-4' ratio={4 / 12} />
            <Item className='col-xs-8' ratio={4 / 12} />
          </Container>
          <Container className='col-xs-12 col-grid' ratio={4 / 12} isGrid isVertical>
            <Item className='col-xs-8' ratio={4 / 12} isActive={false} />
            <Item className='col-xs-4' ratio={4 / 12} />
          </Container>
        </Container>
        <Container className='col-sm-6 col-grid' ratio={4 / 12}>
          <Container className='col-xs-4 col-grid' ratio={8 / 12} isGrid>
            <Item className='col-xs-12' label='ad' header='An Ad' ratio={12 / 12} />
            <Item className='col-xs-12' ratio={12 / 12} />
          </Container>
          <Item className='col-xs-8' label='03' header='Capitalism' ratio={8 / 12} />
        </Container>
      </div>
    )
  }
}

HomeView.propTypes = {
}

HomeView.defaultProps = {
}

export default HomeView
