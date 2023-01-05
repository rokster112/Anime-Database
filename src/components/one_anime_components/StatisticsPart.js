import React from 'react'
import image from '../../images/broken_image.jpeg'

export default function StatisticsPart(props) {

  return (
    <div>
      <div className='statistics-container'>
      <div className='statistics-top-bottom' style={{display: 'flex', flexDirection: 'column'}}>
      <div className='statistics-container-top' style={{display: 'flex', flexDirection: 'row'}}>
        <p className='individual-statistics'>Members: {props.members}</p>
        <p className='individual-statistics'>Favorites: {props.favorites}</p>
        <p className='individual-statistics'>Scored by: {props.scored_by}</p>
        </div>
      <div className='statistics-container-bottom' style={{display: 'flex', flexDirection: 'row'}}>
        <p className='individual-statistics'>Rank: #{props.rank}</p>
        <p className='individual-statistics'>Popularity: #{props.popularity}</p>
        <p className='individual-statistics'>Score: {props.score}</p>
        </div>
      </div>
        <div className='image-container'>
        <a href={props.trailer ? props.trailer.embed_url : 'Trailer Not Available'} target='_blank' rel='noreferrer'>
        <img src={props.trailer.images.medium_image_url === null || 0 || undefined ? image : props.trailer.images.medium_image_url} alt={props.trailer} style={{ maxWidth: '320px', maxHeight: '240px', marginInline: '7.5px', marginBlock: '10px'}}/></a>
        <p style={{textAlign: 'center'}}>{props.trailer.images.image_url === null ? 'Trailer unavailable' : 'Trailer'}</p>
        </div>
      </div>
    </div>
  )
}