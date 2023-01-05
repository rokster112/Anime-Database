import React from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'


export default function AnimeCard(props) {

  return (    
    <div className='anime-card'>
      <Row className="g-6">
      <Col key={props.id} className='g-col-4 mb-2 mt-2'>
      <Card style={{ width: '16rem', height: '28rem', marginInline: '10px', border: '1px solid #e5e5e5'}}>
      <Link to={`/anime/${props.id}`} style={{textDecoration: 'none'}}>
        <Card.Img variant='top' src={props.image} style={{height: '51vh'}}></Card.Img>
        <Card.Body className='anime-card-text-container' style={{height: '10vh', overflow: 'hidden', borderBottom: '1px solid #e5e5e5', borderRadius: '9px'}}>
          <Card.Title className='text-center mb-0' style={{fontSize: '14px', color: 'red'}}>{props.english_title ? props.english_title : props.alternative_title} - {props.japanese_title}</Card.Title>
        </Card.Body>
        </Link>
      </Card>
      </Col>
      </Row>
    </div>
  )

}