import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Characters(props) {

  return (
      <div className='character-card'>
        <Row className="g-6">
        <Col key={props.id} className='g-col-4 mb-2 mt-2' >
        <Card style={{ width: '110px', height: '225px', marginBottom: '20px', marginInline: '5px'}}>
          <div style={{height: '140px', width: '110px'}}>
          <Card.Img variant='top' src={props.image} style={{height: '100%', width: '100%'}}></Card.Img>
          </div>
          <Card.Body className='anime-card-text-container' style={{overflow: 'hidden'}}>
            <Card.Subtitle className='text-center mb-2' style={{fontSize: '12px'}}>Favorites: {props.favorites ? props.favorites : '0'}</Card.Subtitle>
            <Card.Title className='text-center mb-0' style={{fontSize: '12px'}}>{props.name ? props.name : 'loading name'}</Card.Title>
          </Card.Body>
        </Card>
        </Col>
        </Row>
      </div>
  )
}