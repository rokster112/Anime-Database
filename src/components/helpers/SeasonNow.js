import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Carousel from 'react-grid-carousel'

import "react-multi-carousel/lib/styles.css"
import PagesBar from '../PagesBar'

export default function UpcomingAnime(props) {
  console.log('Console log', props.lastPage)


  return (
    <>
  <Carousel containerStyle={{maxWidth: '1200px', marginInline: '0', alignSelf: 'center'}} cols={5} showDots loop>
{ props.now.map(item => {
  return <Carousel.Item key={item.mal_id}>
  <Card style={{ height: '300px', width: '200px', marginInline: '10px' }}>
    <Link to={`/anime/${item.mal_id}`}>
      <div style={{ height: '250px', width: '200px' }}>
        <img style={{ height: '100%', width: '100%' }} src={item.images.jpg.image_url} alt={item.title} />
      </div>
    </Link>
    <div style={{ height: '50px', widht: '120px' }}>
      <Card.Title style={{ fontSize: '13px', margin: '5px 0px 0px 5px'}}>{item.title}</Card.Title>
    </div>
  </Card>
</Carousel.Item>
})  
}
</Carousel>
<PagesBar 
  currentPage={props.currentPage}
  changePage={props.changePage}
  lastPage={props.lastPage}
/>
</>

  )
}